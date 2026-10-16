async function checkLiveSchemas() {
  const url = 'https://zevylo.netlify.app/tools';
  const res = await fetch(url);
  const html = await res.text();
  const regex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let match;
  let count = 0;
  while ((match = regex.exec(html)) !== null) {
    count++;
    console.log(`\n=== JSON-LD Block #${count} ===`);
    try {
      const parsed = JSON.parse(match[1]);
      console.log(JSON.stringify(parsed, null, 2));
    } catch (e) {
      console.log(match[1]);
    }
  }
}

checkLiveSchemas().catch(console.error);
