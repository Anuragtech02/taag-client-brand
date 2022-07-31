import { message } from "antd";

export function KMBFormatter(num) {
  if (num > 1000000000) {
    return (num / 1000000000).toFixed(1) + "B";
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num > 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num;
  }
}

export function showAlert(type, msg) {
  switch (type) {
    case "success":
      message.success(msg);
      break;
    case "error":
      message.error(msg);
      break;
    default:
      message.success(msg);
      break;
  }
}

export function getYoutubeId(url) {
  return /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/.exec(
    url
  );
}
