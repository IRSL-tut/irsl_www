const statusEl = document.getElementById("status");
const modeEl = document.getElementById("mode");

const ros = ros_start();
const topicName = new URLSearchParams(window.location.search).get("topic") || "/joy";

const publisher = new GamepadROSJoyPublisher({
    ros,
    topic: topicName
});

// UI更新
function updateUI(pad) {
    if (!pad) {
        statusEl.textContent = "コントローラ未接続";
        return;
    }

    let text = `ID: ${pad.id}\n\n`;

    text += "🎯 Buttons:\n";
    pad.buttons.forEach((b, i) => {
        text += `  Button ${i}: ${b.pressed ? "ON" : "OFF"}\n`;
    });

    text += "\n🕹 Axes:\n";
    pad.axes.forEach((a, i) => {
        text += `  Axis ${i}: ${a.toFixed(3)}\n`;
    });

    statusEl.textContent = text;
}

// メインループ
function loop() {
    const pad = publisher.updateFromGamepad();

    if (pad) {
        const mode = modeEl.value;

        if (publisher.shouldPublish(mode)) {
            publisher.publish(publisher.lastMsg);
            publisher.commit();
        }
    }

    updateUI(pad);
    requestAnimationFrame(loop);
}

// periodic送信
setInterval(() => {
    if (modeEl.value !== "periodic") return;
    if (!publisher.lastMsg) return;

    publisher.publish(publisher.lastMsg);
}, 50);

loop();