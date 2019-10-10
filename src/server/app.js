const jsonServer = require('json-server');
const app = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({
  static: path.join(process.cwd(), 'dist'),
  bodyParser: true
});
const authRoutes = require('./auth-routes');

const PORT = process.env.PORT || 3000;

app.use(middlewares);

app.post('/api/login', authRoutes.login);
app.post('/api/logout', authRoutes.logout);
app.use('/api', authRoutes.isAuthorized);
app.use('/api', router);

app.listen(PORT, function() {
  console.log('JSON Server is running on port ' + PORT);
});