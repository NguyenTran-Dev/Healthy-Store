const fs = require('fs');
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  res.setHeader('Content-Type', 'text/html');
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>My page</title></head>');
    res.write('<body><form action="/create-user" method="post"><label>username:</label><input type="text" name="username"></input><button type="submit">submit</button></form></body>');
    res.write('</html>');
  } else if (url === '/users') {
    res.write('<html>');
    res.write('<head><title>My page</title></head>');
    res.write('<body><ul><li>User1</li></ul></body>');
    res.write('</html>');
    return res.end();
  } else if (url === '/create-user' && method === 'POST') {
    res.write('<html>');
    res.write('<head><title>My page</title></head>');
    res.write('<body>Create success</body>');
    res.write('</html>');
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    })
    return req.on('end', () => {
      const parse_data = Buffer.concat(body).toString();
      const data_username = parse_data.split('=')[1];
      fs.writeFile('uses.txt', data_username, (err) => {
        res.statusCode = 302;
        return res.end();
      })
    })
  }
  res.end();
}

module.exports = requestHandler;
