import { storage } from "../store/storage";
import { API_URL } from "../../constants/ApplicationUrl";
// import ReactHtmlParser from 'react-html-parser';

export const isUserloggedIn = () => {
  if (storage.isLoggedIn()) {
    return true;
  }
  return false;
};

export const getDocumentLink = (link) => {
  if (link) {
    const path = `${API_URL()}/${link}`;
    return path;
  }
  return "";
};

export const dropdownOptionsTransform = (array, text, val) => {
  const isArray = array instanceof Array;
  let options = [];
  if (isArray) {
    options = array.reduce((arr, option) => {
      const label = option[text] || "";
      const value = option[val] || "";
      arr.push({ text: label, value });
      return arr;
    }, []);
  }
  return options;
};

export const unEscapeRegHtml = (unsafe) => {
  if (!unsafe) {
    return "";
  }
  // return ReactHtmlParser(unsafe.replace(/amp;/g, ""))
};

export const timeAgo = (time) => {
  const now = new Date();
  const timestamp = new Date(time);
  const secondsAgo = Math.floor((now - timestamp) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const interval in intervals) {
    const count = Math.floor(secondsAgo / intervals[interval]);
    if (count > 0) {
      if (count === 1) {
        return count + " " + interval + " ago";
      } else {
        return count + " " + interval + "s ago";
      }
    }
  }

  return "just now";
};
