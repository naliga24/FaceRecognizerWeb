const path = require('path')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`))
  })
  // JSX file page.
  app.get('/HomePage', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`))
  })
  app.get('/Subject', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`))
  })
  app.get('/SubjectSearch', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`))
  })
  app.get('/Semester', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`))
  })
  app.get('/SemesterSearch', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`))
  })
  app.get('/Student', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`))
  })
  app.get('/StudentSearch', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`))
  })
  app.get('/Teacher', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`))
  })
  app.get('/TeacherSearch', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`))
  })
  app.get('/ClassAttendance', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`))
  })
  app.get('/ClassAttendanceSearch', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`))
  })
  app.get('/User', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`))
  })
  app.get('/UserSearch', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`))
  })
  app.get('/Configuration', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`))
  })
  app.get('/Report', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`))
  })
  app.get('/ShowPdfTransaction', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`))
  })
  app.get('/ShowPdfAttendance', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`))
  })
}
