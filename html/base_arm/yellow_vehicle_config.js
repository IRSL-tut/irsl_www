// config_alpha.js
import baseConfig from './sample_robot_config.js';

const yellowVechileConfig = {
  ...baseConfig,  // baseConfigをコピーして
  jointTopicName: "/AssembleRobot/joint_controller/command", // 上書き
  jointNames: ["LINK_0", "LINK_1", "LINK_2", "LINK_3", "LINK_4"],
  trajectoryDurationSecs: 1,
  initialLinearSpeed: 0.2,
  initialAngularSpeed: 0.3
};

export default yellowVechileConfig;