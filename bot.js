const mineflayer = require("mineflayer");
const { pathfinder, Movements, goals } = require("mineflayer-pathfinder");
const { GoalBlock } = goals;

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

  // 🔐 Rejestracja / logowanie
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

  // 🔁 Pojawienie się (pierwszy raz lub po przeładowaniu)
  let firstSpawn = true;

  bot.on("spawn", () => {
    console.log("🌍 Bot pojawił się w świecie");

    if (firstSpawn) {
      firstSpawn = false;

      // Kompas w slocie 0
      setTimeout(() => {
        bot.setQuickBarSlot(0);
        bot.activateItem();
        console.log("🧭 Kliknięto kompas");
      }, 5000);
    } else {
      // SkyBlock: /is i idź na golemiarkę
      setTimeout(() => {
        bot.chat("/is");
        console.log("📦 Wpisano /is");
      }, 6000);

      setTimeout(() => {
        const mcData = require("minecraft-data")(bot.version);
        const defaultMove = new Movements(bot, mcData);
        bot.pathfinder.setMovements(defaultMove);

        const goal = new GoalBlock(4317, 71, 4524);
        bot.pathfinder.setGoal(goal);
        console.log("🚶‍♂️ Bot idzie na golemiarkę...");
      }, 11000);
    }
  });

  // 📂 Obsługa GUI
  bot.on("windowOpen", (window) => {
    console.log("📂 Otworzono GUI:", window.title);

    if (window.title.includes("Menu serwerów")) {
      setTimeout(() => {
        bot.clickWindow(15, 0, 0); // slot 15 – lava bucket
        console.log("🌋 Kliknięto SkyBlock (slot 15)");
      }, 1500);
    }

    if (window.title.toLowerCase().includes("wyspa")) {
      setTimeout(() => {
        bot.clickWindow(0, 0, 0); // slot 0 – teleport na wyspę
        console.log("🚪 Kliknięto teleport na wyspę");
      }, 1500);
    }
  });

  bot.on("goal_reached", () => {
    console.log("🛑 Dotarto do golemiarki – AFK");
  });

  bot.on("kicked", (reason) => {
    console.log("❌ Wyrzucono z serwera:", reason);
  });

  bot.on("error", (err) => {
    console.log("⚠️ Błąd:", err);
  });

  // 🔁 Automatyczny reconnect po rozłączeniu
  bot.on("end", () => {
    console.log(
      "🔄 Bot został rozłączony. Próba ponownego połączenia za 30 sek...",
    );
    setTimeout(() => {
      process.exit(); // Replit automatycznie uruchomi ponownie
    }, 30000);
  });
}

createBot();
