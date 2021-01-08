var timer;
var time;
var timerExists = false

Number.prototype.pad = function(size) {
      var s = String(this);
      while (s.length < (size || 2)) {s = "0" + s;}
      return s;
}

function pageDidLoad() {
	 setTimerLabel(getSliderValue())
	 time = getSliderValue()
}

function sliderChanged(newVal) {
	if (timerExists) {
		return
	} else {
		time = newVal
		setTimerLabel(newVal)
	}
}

function getSliderValue() {
	return document.getElementById("slider").value
}

function set1() {
	time = document.getElementById("interval1").value
	setTimerLabel(time)
}

function set2() {
	time = document.getElementById("interval2").value
	setTimerLabel(time)
}

function getTimerLabel() {
	return document.getElementById("timerLabel").value
}

function setTimerLabel(newVal) {
	document.getElementById("timerLabel").innerHTML= getTime(newVal)
}

function getTime(newVal) {
	var minutes = Math.floor(newVal)
	minutes = minutes.pad(2)

	var seconds = (newVal - minutes) * 60
	seconds = Math.floor(seconds)
	seconds = "00" + seconds
	seconds = seconds.substr(seconds.length - 2)

	return (minutes + ":" + seconds)
}

// Timer Fuctions

function beginTimer() {
	if (timerExists) {
		return
	}
	timerExists = true
	timer = setInterval(updateTime, 1000)
}

function endTimer() {
	timerExists = false
	clearInterval(timer)
}

function resetTimer() {
	time = getSliderValue()
	setTimerLabel(time)
}

function updateTime() {
	time -= (1 / 60)
	if (time <= 0) {
		document.getElementById("timerLabel").innerHTML = "Expired"
		var audio = new Audio('alarm.mp3');
		if(timerExists) {
			audio.play();
		}
		endTimer()
		setTimeout(function(){
			if (confirm("Session is completed!")) {
				audio.pause();
audio.currentTime = 0;
			}
		},100)
	} else {
		setTimerLabel(time)	
	}
}