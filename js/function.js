async function translated(text, origin, destination) {
	return new Promise(async (resolve, reject) => {
	  const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
	  const options = {
		method: 'POST',
		headers: {
		  'content-type': 'application/x-www-form-urlencoded',
		  'Accept-Encoding': 'application/gzip',
		  'X-RapidAPI-Key': '02e2c7be6cmsh1a8ef466d363fe4p1cfa9ajsn7bb9490e5bf0',
		  'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
		},
		body: new URLSearchParams({
		  q: text,
		  target: origin,
		  source: destination
		})
	  };
  
	  try {
		const response = await fetch(url, options);
		const result = await response.json();
		resolve(result);
	  } catch (error) {
		reject(error);
	  }
	});
  }