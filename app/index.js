/* fitbit imports */
import clock from "clock";
import document from "document";
import { battery } from "power";
import { zeroPad } from "./utils";

let hourhand = document.getElementById("hourhand");
let minutehand = document.getElementById("minutehand");
let secondhand = document.getElementById("secondhand");
let batteryLevelLow = document.getElementById("batteryLow");
let batteryLevelCritical = document.getElementById("batteryCritical");
let dayOfMonth = document.getElementById("dayOfMonth");
let digitalTime = document.getElementById("digitalTime");

clock.granularity = "seconds";
let currentDayOfMonth = -1;
let currentMinutes = -1;
let batteryChargeLevel = -1;

clock.ontick = tick => {
  adjustTime(tick.date);
  // setManualTime();
  adjustDate(tick.date);
  adjustBattery();
};

function adjustTime(date) {
  if (date.getMinutes() !== currentMinutes) {
    currentMinutes = date.getMinutes();
    hourhand.groupTransform.rotate.angle = 30 * (date.getHours() % 12) + 0.5 * currentMinutes;

    let hours = date.getHours();
    let minutes = zeroPad(date.getMinutes(), 2);
    let marker = "AM";

    if (hours >= 12) {
      marker = "PM";
    }

    if (hours > 12) {
      hours = hours - 12;
    }

    if (hours == 0) {
      hours = 12;
    }

    digitalTime.text = `${hours}:${minutes} ${marker}`;
  }

  minutehand.groupTransform.rotate.angle = 6 * currentMinutes + 0.1 * date.getSeconds();
  secondhand.groupTransform.rotate.angle = 6 * date.getSeconds();
}

function adjustDate(date) {
  if (date.getDate() !== currentDayOfMonth) {
    currentDayOfMonth = date.getDate();
    dayOfMonth.text = currentDayOfMonth;
  }
}

function adjustBattery() {
  if (batteryChargeLevel !== battery.chargeLevel) {
    batteryChargeLevel = battery.chargeLevel;

    // batteryChargeLevel = batteryChargeLevel - 75; // debug: low
    // batteryChargeLevel = batteryChargeLevel - 90; // debug: critical

    let batteryLow = batteryChargeLevel <= 30;
    let batteryCritical = batteryChargeLevel <= 15;

    if (batteryCritical) {
      batteryLevelCritical.style.display = "inline";
      batteryLevelLow.style.display = "none";
      batteryLevelCritical.text = `${batteryChargeLevel}%`;
    } else if (batteryLow) {
      batteryLevelLow.style.display = "inline";
      batteryLevelLow.text = `${batteryChargeLevel}%`;
    } else {
      batteryLevelCritical.style.display = "none";
      batteryLevelLow.style.display = "none";
    }
  }
}

/* debugging */

function setManualTime() {
  let minute = 11;
  let hour = 2;
  let seconds = 14;
  hourhand.groupTransform.rotate.angle = 30 * (hour % 12) + 0.5 * currentMinutes;
  minutehand.groupTransform.rotate.angle = 6 * minute + 0.1 * 35;
  secondhand.groupTransform.rotate.angle = 6 * seconds;
}
