class GamepadROSJoyPublisher {
    constructor({ ros, topic = "/joy" }) {
        this.ros = ros;
        this.topicName = topic;

        this.rosConnected = false;
        this.lastMsg = null;
        this.prevMsg = null;

        this.joyTopic = null;

        if (ros) {
            ros.on("connection", () => this.rosConnected = true);
            ros.on("error", () => this.rosConnected = false);
            ros.on("close", () => this.rosConnected = false);

            this.initTopic();
        }
    }

    initTopic() {
        this.joyTopic = new ROSLIB.Topic({
            ros: this.ros,
            name: this.topicName,
            messageType: "sensor_msgs/Joy"
        });
    }

    getGamepad() {
        const pads = navigator.getGamepads?.() || [];
        return pads.find(p => p) || null;
    }

    buildMsg(pad) {
        const now = Date.now();
        const secs = Math.floor(now / 1000);
        const nsecs = (now % 1000) * 1e6;
        return {
            header: {
                stamp: { secs, nsecs },
                frame_id: "joy"
            },
            axes: pad.axes.map(v => Number(v.toFixed(4))),
            buttons: pad.buttons.map(b => b.pressed ? 1 : 0)
        };
    }

    isChanged(a, b) {
        if (!a || !b) return true;
        if (a.axes.length !== b.axes.length) return true;
        if (a.buttons.length !== b.buttons.length) return true;

        for (let i = 0; i < a.axes.length; i++) {
            if (a.axes[i] !== b.axes[i]) return true;
        }

        for (let i = 0; i < a.buttons.length; i++) {
            if (a.buttons[i] !== b.buttons[i]) return true;
        }

        return false;
    }

    publish(msg) {
        if (!this.rosConnected || !this.joyTopic) return;
        this.joyTopic.publish(new ROSLIB.Message(msg));
    }

    updateFromGamepad() {
        const pad = this.getGamepad();
        if (!pad) return null;

        this.lastMsg = this.buildMsg(pad);
        return pad;
    }

    shouldPublish(mode) {
        if (mode === "periodic") return true;
        return this.isChanged(this.lastMsg, this.prevMsg);
    }

    commit() {
        this.prevMsg = this.lastMsg;
    }
}