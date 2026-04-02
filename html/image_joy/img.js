////
const camera0_img_listener = new ROSLIB.Topic({
  ros : ros,
  name : '/image_joy_camera0/image_raw/compressed',
  // messageType : 'std_msgs/msg/String' ROS2
  messageType : 'sensor_msgs/CompressedImage', // ROS1
  queue_length : 1
});
const camera1_img_listener = new ROSLIB.Topic({
  ros : ros,
  name : '/image_joy_camera1/image_raw/compressed',
  // messageType : 'std_msgs/msg/String' ROS2
  messageType : 'sensor_msgs/CompressedImage', // ROS1
  queue_length : 1
});
const camera2_img_listener = new ROSLIB.Topic({
  ros : ros,
  name : '/image_joy_camera2/image_raw/compressed',
  // messageType : 'std_msgs/msg/String' ROS2
  messageType : 'sensor_msgs/CompressedImage', // ROS1
  queue_length : 1
});

////
var current_unsubscribe = undefined;

///
function ros_camera0_img_subscribe() {
  if (current_unsubscribe) {
    current_unsubscribe();
  }
  current_unsubscribe = ros_camera0_img_unsubscribe;
  camera0_img_listener.subscribe( msg => {
    let content = document.getElementById("rosimg");
    content.src = "data:image/jpeg;base64," + msg.data;
  });
};
function ros_camera0_img_unsubscribe() {
  console.log('unsubscribe:camera0')
  camera0_img_listener.unsubscribe();
};
////
function ros_camera1_img_subscribe() {
  if (current_unsubscribe) {
    current_unsubscribe();
  }
  current_unsubscribe = ros_camera1_img_unsubscribe;
  camera1_img_listener.subscribe( msg => {
    let content = document.getElementById("rosimg");
    content.src = "data:image/jpeg;base64," + msg.data;
  });
};
function ros_camera1_img_unsubscribe() {
  console.log('unsubscribe:camera1')
  camera1_img_listener.unsubscribe();
};
////
function ros_camera2_img_subscribe() {
  if (current_unsubscribe) {
    current_unsubscribe();
  }
  current_unsubscribe = ros_camera2_img_unsubscribe;
  camera2_img_listener.subscribe( msg => {
    let content = document.getElementById("rosimg");
    content.src = "data:image/jpeg;base64," + msg.data;
  });
};
function ros_camera2_img_unsubscribe() {
  console.log('unsubscribe:camera2')
  camera2_img_listener.unsubscribe();
};

ros_camera0_img_subscribe();
