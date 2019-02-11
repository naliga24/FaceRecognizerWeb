const childProcess = require('child_process');
const fs = require('fs');

// ----------------------------------------------------------------------------------------------
// Need to populate this with Application paths for popular PDF readers
// ----------------------------------------------------------------------------------------------
 //let PDFApplications = ["C:\\Program Files (x86)\\Foxit Software\\Foxit Reader\\FoxitReader.exe"];
const PDFApplications = ['C:\\Program Files (x86)\\Adobe\\Acrobat Reader DC\\Reader\\AcroRd32.exe'];

module.exports = (err, reportName, res) => {
  if (err) {
    console.error('Your report', reportName, 'had errors', err);
    return;
  }
  let found = false;

  // Add the current working directory to the file so Foxit can find it
  const name = `${process.cwd()}\\${reportName}`;
  for (let i = 0; i < PDFApplications.length; i += 1) {
    if (fs.existsSync(PDFApplications[i])) {
      childProcess.execFile(PDFApplications[i], [name], () => { });
      found = true;
      break;
    }
  }
  if (found) {
    console.log('Your report has been rendered to', name);
  }
  res.status(200).send('Display report complete!')
}
