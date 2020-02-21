var electronInstaller = require('electron-winstaller');

try {
   electronInstaller.createWindowsInstaller({
    appDirectory: '../out/play-win32-x64',
    outputDirectory: '../out/installer64',
    authors: 'My App Inc.',
    exe: 'play.exe'
  });
  console.log('It worked!');
} catch (e) {
  console.log(`No dice: ${e.message}`);
}
