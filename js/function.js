async function translated(text, origin, destination) {
	return new Promise(async (resolve, reject) => {
	  const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
	  const options = {
		method: 'POST',
		headers: {
		  'content-type': 'application/x-www-form-urlencoded',
		  'Accept-Encoding': 'application/gzip',
		  'X-RapidAPI-Key': 'd88bc681eemshce849d561a5b7f3p196453jsna449dcca90f2',
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
