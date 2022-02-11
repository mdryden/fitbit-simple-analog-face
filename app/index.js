/* fitbit imports */
import clock from "clock";
import document from "document";
import { battery } from "power";

let hourhand = document.getElementById("hourhand");
let minutehand = document.getElementById("minutehand");
let secondhand = document.getElementById("secondhand");

let batteryPercent = document.getElementById("battery");
let lowBatteryPercent = document.getElementById("batteryLow");
let dayOfMonth = document.getElementById("dayOfMonth");
let digitalTime = document.getElementById("digitalTime");

clock.granularity = "seconds";
let currentDayOfMonth = -1;
let currentMinutes = -1;
let batteryChargeLevel = -1;

clock.ontick = tick => {
  adjustTime(tick.date);
  adjustDate(tick.date);
  adjustBattery();
};

function adjustTime(date) {
  if (date.getMinutes() !== currentMinutes) {
    currentMinutes = date.getMinutes();
    hourhand.groupTransform.rotate.angle = 30 * (date.getHours() % 12) + 0.5 * currentMinutes;
  }

  minutehand.groupTransform.rotate.angle = 6 * currentMinutes + 0.1 * date.getSeconds();
  secondhand.groupTransform.rotate.angle = 6 * date.getSeconds();

  // let hours = date.getHours();
  // let minutes = date.getMinutes();
  // let marker = "AM";

  // if (hours > 12) {
  //   hours = hours - 12;
  //   marker = "PM";
  // }

  // digitalTime.text = `${hours}:${minutes} ${marker}`;
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
    batteryPercent.text = `${batteryChargeLevel}%`;
    lowBatteryPercent.text = batteryPercent.text;

    let batteryLow = batteryChargeLevel < 15;

    if (batteryLow) {
      lowBatteryPercent.style.display = "block";
      batteryPercent.style.display = "none";
    } else {
      batteryPercent.style.display = "block";
      lowBatteryPercent.style.display = "none";
    }
  }
}
