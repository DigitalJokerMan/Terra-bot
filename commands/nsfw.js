const Danbooru = require('danbooru');
const booru = new Danbooru();

module.exports.config = {
    name: "nsfw",
    description: "Shows an nsfw image from danbooru",
    usage: "",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 0
}

module.exports.run = (client, message, args) => {
    if (!message.channel.nsfw) {
        message.reply('Shh! there are kids in here!');
        return;
    }
    message.channel.send('<a:googling:426453223310622740>' + ' Loading...').then(msg => {
        fetchPosts(message, color, msg, args);
    });

    function fetchPosts(message, color, msg, args) {
        booru.posts({ tags: 'rating:e limit:200 order:rank' }).then(posts => {
            if ('success' in posts && !posts.success) {
                setTimeout(() => {
                    console.log(`Error: ${posts.message}\nRetrying in 1 second...`);
                    fetchPosts(message, color, msg);
                }, 1000);
            } else {
                const newPosts = posts.filter(item => item !== undefined);
                const index = Math.floor(Math.random() * newPosts.length);
                const post = newPosts[index];
                const url = booru.url(post.file_url);
                const name = `${post.md5}.${post.file_ext}`;
                if (post.file_ext == '.mp4') {
                    msg.edit(url);
                    return;
                }
                const embed = new Discord.RichEmbed()
                    .setColor(color)
                    .setTitle(name)
                    .setURL(url)
                    .setImage(url);
                msg.edit({ embed }).catch(console.error);
            }
        });
    }
}