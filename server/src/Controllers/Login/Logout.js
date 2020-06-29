export default async function(req, res) {
  await req.session.destroy();
  res.send('logged out');
}
