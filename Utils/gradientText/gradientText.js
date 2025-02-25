
////////////////////////////////////////////////////////////////////////

//
function onColorClicked(sender) {
    try {
        openColorPicker(sender);
    } catch (e) {
        console.error(`onBeginColorClocked exception: ${e}`);
    }
}

//
function rgbToHex(rgb) {
    var result = rgb.match(/\d+/g).map(function(x) {
        return parseInt(x).toString(16).padStart(2, '0');
    });
    return `#${result.join('')}`;
}

// 
function openColorPicker(button) {
    try {
        _lastSelectColorDiv = button;
        const cpw = document.querySelector('#_colorPickerWindow');
        cpw.style.display = 'block';

        const picker = document.querySelector('#_colorPicker');
        const color = button.style.backgroundColor;
        picker.value = rgbToHex(color);
        //picker.value = '#ff0000';
        //picker.select();
    } catch (e) {
        console.error(`openColorPicker exception: ${e}`);
    }
}

// 
function selectedColor() {
    try {
        const picker = document.querySelector('#_colorPicker');
        _lastSelectColorDiv.style.backgroundColor = picker.value;

        const cpw = document.querySelector('#_colorPickerWindow');
        cpw.style.display = 'none';
        
        const idx = parseInt(_lastSelectColorDiv.id.charAt(_lastSelectColorDiv.id.length - 1), 10);
        _localData.colors[idx] = picker.value;
        saveLocalData();

    } catch (e) {
        console.error(`selectedColor exception: ${e}`);
    }
}

// 
function cancelSelectColor() {
    try {
        const cpw = document.querySelector('#_colorPickerWindow');
        cpw.style.display = 'none';
    } catch (e) {
        console.error(`cancelSelectColor exception: ${e}`);
    }
}

// 
window.onload = function() {
    try {
        loadLocalData();

        for (var i = 0; i < 5; i++) {
            var color = document.querySelector(`#_color${i}`);
            color.style.backgroundColor = _localData.colors[i];
        }

        selectColorIndex(_localData.endColorIdx);
    } catch (e) {
        console.error(`onload exception: ${e}`);
    }
}

// 
function saveLocalData() {
    try {
        var jsonString = JSON.stringify(_localData);
        localStorage.setItem('LocalData', jsonString);
    } catch (e) {
        console.error(`saveLocalData exception: ${e}`);
    }
}

//
function loadLocalData() {
    try {
        var jsonString = localStorage.getItem('LocalData');
        _localData = JSON.parse(jsonString);
        if (_localData === null) { _localData = {}; }

        // color
        if (_localData.colors == undefined || _localData.colors.length == undefined || _localData.colors.length < 5) { 
            _localData.colors = [
                'ff0000',
                'fa0b00',
                'cc00dd',
                '255400',
                'ff0ff0',
            ];
        } 
    } catch (e) {
        console.error(`loadLocalData exception: ${e}`);
    }
}

//
function selectedColorIndex() {
    try {
        return parseInt(document.querySelector('input[name="_colorIdx"]:checked').value, 10);
    } catch (e) {
        console.error(`selectedColorIndex exception: ${e}`);
        return 0;
    }
}

//
function selectColorIndex(idx) {
    try {
        document.querySelector(`input[name="_colorIdx"][value="${idx}"]`).checked = true;
    } catch (e) {
        console.error(`selectedColorIndex exception: ${e}`);
    }
}

// 
function convert() {
    try {
        const content = document.querySelector('#_content').value;
        if (content.length <= 0) {
            alert('input content');
            return;
        }

        const colorEndIdx = selectedColorIndex();
        let colorStep = [];
        for (var i = 0; i <= colorEndIdx; i++) {
            //colorStep.push(document.querySelector(`#_color${i}`).style.backgroundColor);
            colorStep.push(_localData.colors[i]);
        }
        _localData.endColorIdx = colorEndIdx;
        saveLocalData();

        const type = document.querySelector('#_type');
        let text = '';
        let result = undefined;
        if (type.value == TYPE_LINE_LETTER) {
            const lines = content.replace(/\r/g, '').split('\n');
            lines.forEach(element => {
                //var colors = getColors(_localData.beginColor, _localData.endColor, element.length);
                //var colors = getGradientColor(colorStep, element.length);
                var colors = getGradientColor(colorStep, element.length);
                for (var i = 0; i < element.length; i++) {
                    text += `<span style="color: ${colors[i]}">${element[i]}</span>`;
                }
                text += '</br>';
            });

        } else if (type.value == TYPE_FULL_LETTER) {
            var colors = getGradientColor(colorStep, content.length);
            for (var i = 0; i < content.length; i++) {
                if (content[i] == '\r') { continue; }
                else if (content[i] == '\n') {
                    text += '</br>';
                } else {
                    text += `<span style="color: ${colors[i]}">${content[i]}</span>`;
                }
            }
            text += '</br>';
        } else if (type.value == TYPE_LINE) {
            const lines = content.replace(/\r/g, '').split('\n');
            var colors = getGradientColor(colorStep, lines.length);
            for (var i = 0; i < lines.length; i++) {
                if (lines[i] == '\n') {
                    text += '</br>';
                    continue;
                }
                text += `<span style="color: ${colors[i]}">${lines[i]}</span></br>`;
            }
        } else if (type.value == TYPE_PARAGRAPHS) {
            const paragraphs = content.replace(/\r/g, '').split('\n\n');
            var colors = getGradientColor(colorStep, paragraphs.length);
            for (var i = 0; i < paragraphs.length; i++) {
                if (paragraphs[i] == '\n') {
                    text += '</br>';
                    continue;
                }

                var par = paragraphs[i].replace(/\n/g, '</br>');

                text += `<span style="color: ${colors[i]}">${par}</span></br></br>`;
            }
        }

        result = document.querySelector('#_result');
        result.innerHTML = text;

        const range = document.createRange();
        range.selectNode(result);
        window.getSelection().removeAllRanges(); // 기존 선택 제거
        window.getSelection().addRange(range); // 새로운 선택 추가

        // 클립보드에 복사
        try {
            const successful = document.execCommand('copy');
            const msg = successful ? '성공적으로 복사되었습니다.' : '복사에 실패했습니다.';
            //console.log(msg);
            alert(msg);
        } catch (err) {
            console.error('텍스트를 클립보드에 복사하는 중 오류가 발생했습니다:', err);
            alert(err);
        }

        // 선택 해제
        window.getSelection().removeAllRanges();
        
    } catch (e) {
        console.error(`convert exception: ${e}`);
    }
}

//
function getColor(color1, color2, range, value) {
    // Hex 색상을 RGB로 변환하는 함수
    function hexToRgb(hex) {
        var bigint = parseInt(hex.slice(1), 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        return [r, g, b];
    }

    // RGB 색상을 Hex로 변환하는 함수
    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }

    // 두 색상 간의 비율 계산
    function interpolateColor(color1, color2, factor) {
        if (arguments.length < 3) { 
            factor = 0.5; 
        }
        var result = color1.slice();
        for (var i = 0; i < 3; i++) {
            result[i] = Math.round(result[i] + factor * (color2[i] - result[i]));
        }
        return result;
    }

    var color1Rgb = hexToRgb(color1);
    var color2Rgb = hexToRgb(color2);
    var factor = value / (range - 1);
    var interpolatedColor = interpolateColor(color1Rgb, color2Rgb, factor);
    
    return rgbToHex(interpolatedColor[0], interpolatedColor[1], interpolatedColor[2]);
}

//
function getColors(color1, color2, range) {
    // Hex 색상을 RGB로 변환하는 함수
    function hexToRgb(hex) {
        var bigint = parseInt(hex.slice(1), 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        return [r, g, b];
    }

    // RGB 색상을 Hex로 변환하는 함수
    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }

    // 두 색상 간의 비율 계산
    function interpolateColor(color1, color2, factor) {
        var result = color1.slice();
        for (var i = 0; i < 3; i++) {
            result[i] = Math.round(result[i] + factor * (color2[i] - result[i]));
        }
        return result;
    }

    var color1Rgb = hexToRgb(color1);
    var color2Rgb = hexToRgb(color2);
    var colors = [];

    for (var i = 0; i < range; i++) {
        var factor = i / (range - 1);
        var interpolatedColor = interpolateColor(color1Rgb, color2Rgb, factor);
        colors.push(rgbToHex(interpolatedColor[0], interpolatedColor[1], interpolatedColor[2]));
    }

    return colors;
}

//
function getGradientColor(colorRange, range) {
    function hexToRgb(hex) {
        // 16진수 색상을 RGB 값으로 변환
        let bigint = parseInt(hex.slice(1), 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;
        return [r, g, b];
    }
    
    function rgbToHex(r, g, b) {
        // RGB 값을 16진수 색상으로 변환
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }
    
    function interpolateColor(color1, color2, factor) {
        // 두 색상 사이의 색상을 계산
        if (arguments.length < 3) {
            factor = 0.5;
        }
        let result = color1.slice();
        for (let i = 0; i < 3; i++) {
            result[i] = Math.round(result[i] + factor * (color2[i] - result[i]));
        }
        return result;
    }

    // 그라데이션 색상 계산
    let gradientColors = [];
    let colorSegments = colorRange.length - 1;
    let totalSteps = range - 1; // 총 단계 수는 range - 1이어야 함
    let stepsPerSegment = totalSteps / colorSegments;

    for (let i = 0; i < totalSteps; i++) {
        let segmentIndex = Math.floor(i / stepsPerSegment);
        let factor = (i % stepsPerSegment) / stepsPerSegment;
        let color1 = hexToRgb(colorRange[segmentIndex]);
        let color2 = hexToRgb(colorRange[segmentIndex + 1]);
        let interpolatedColor = interpolateColor(color1, color2, factor);
        gradientColors.push(rgbToHex(interpolatedColor[0], interpolatedColor[1], interpolatedColor[2]));
    }

    gradientColors.push(colorRange[colorRange.length - 1]);
    
    return gradientColors;
}