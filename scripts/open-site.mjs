import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';

const project = fileURLToPath(new URL('../', import.meta.url));
const url = 'http://127.0.0.1:5178/';

async function isReady() {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(1000) });
    return response.ok && (await response.text()).includes('/src/main.jsx');
  } catch {
    return false;
  }
}

try {
  if (!(await isReady())) {
    const server = spawn(process.execPath, [
      resolve(project, 'node_modules/vite/bin/vite.js'),
      '--host', '127.0.0.1', '--port', '5178', '--strictPort',
    ], { cwd: project, detached: true, stdio: 'ignore', windowsHide: true });
    server.unref();

    let ready = false;
    for (let attempt = 0; attempt < 40; attempt++) {
      if (await isReady()) { ready = true; break; }
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    if (!ready) throw new Error('Site startup failed. Run npm.cmd install and check port 5178.');
  }

  const chrome = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  ].find(existsSync);
  const browser = chrome
    ? spawn(chrome, ['--new-window', url], { detached: true, stdio: 'ignore' })
    : spawn('explorer.exe', [url], { detached: true, stdio: 'ignore' });
  await new Promise((resolve, reject) => {
    browser.once('spawn', resolve);
    browser.once('error', reject);
  });
  browser.unref();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
