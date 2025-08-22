// robot_config.js
const config = {
  jointNames: ["joint1", "joint2", "joint3", "joint4", "joint0"],
  twistTopicName: "/cmd_vel",
  jointTopicName: "/Frame_Short/joint_controller/command",
  sliderMin: -3.14,
  sliderMax: 3.14,
  sliderStep: 0.01,
  trajectoryDurationSecs: 5,
  linearStep: 0.01,
  linearMin: 0.0,
  linearMax: 1.0,
  angularStep: 0.01,
  angularMin: 0.0,
  angularMax: 1.0,
  initialLinearSpeed: 0.5,
  initialAngularSpeed: 0.5
};

export default config;
