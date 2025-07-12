const mineflayer = require("mineflayer");
const { pathfinder } = require("mineflayer-pathfinder");

const PASSWORD = "mojehaslo123";
const BOT_NICK = "BotKaktus123";

function createBot() {
  const bot = mineflayer.createBot({
    host: "craftmc.pl",
    port: 25565,
    username: BOT_NICK,
    version: "1.18.2",
  });

  bot.loadPlugin(pathfinder);

  bot.on("messagestr", (message) => {
    console.log("💬 Serwer:", message);
    if (message.includes("/register")) {
      bot.chat(`/register ${PASSWORD} ${PASSWORD}`);
      console.log("🆕 Wysłano rejestrację");
    } else if (message.includes("/login")) {
      bot.chat(`/login ${PASSWORD}`);
      console.log("🔐 Wysłano logowanie");
    }
  });

  let firstSpawn = true;

  bot.on("spawn", () => {
    console.log("🌍 Bot pojawił się w świecie");

    if (firstSpawn) {
      firstSpawn = false;

      setTimeout(() => {
        bot.setQuickBarSlot(0); // Wybierz kompas
        bot.activateItem(); // Kliknij PPM
        console.log("🧭 Kliknięto kompas");
      }, 5000);
    }
  });

  bot.on("windowOpen", (window) => {
    console.log("📂 Otworzono GUI:", window.title);

    if (window.title.includes("Menu serwerów")) {
      setTimeout(() => {
        bot.clickWindow(15, 0, 0); // SkyBlock
        console.log("🌋 Kliknięto SkyBlock (slot 15)");
      }, 1500);
    }

    if (window.title.toLowerCase().includes("wyspa")) {
      setTimeout(() => {
        bot.clickWindow(0, 0, 0); // Teleport na wyspę
        console.log("🚪 Kliknięto teleport na wyspę");
      }, 1500);
    }
  });

  bot.on("goal_reached", () => {
    console.log("🛑 Dotarto do celu (nieużywane w tej wersji)");
  });

  bot.on("spawn", () => {
    setTimeout(() => {
      bot.chat("/tpa triferek");
      console.log("📨 Wysłano /tpa triferek");
    }, 7000); // Po około zalogowaniu na SkyBlock
  });

  bot.on("kicked", (reason) => {
    console.log("❌ Wyrzucono z serwera:", reason);
  });

  bot.on("error", (err) => {
    console.log("⚠️ Błąd:", err);
  });

  bot.on("end", () => {
    console.log("🔄 Rozłączono. Próba ponownego połączenia za 30 sek...");
    setTimeout(() => {
      process.exit();
    }, 30000);
  });
}

createBot();
