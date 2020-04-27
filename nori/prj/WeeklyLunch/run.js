///////////////////
/// [전역 변수 선언]
var _menuArray = null;
var _tracks = null;
var _runners = null;
var _timer = null;
var _dayOfWeekInfo = null;
var _dayRankTable = null;

// run 실행
function OnRun(menuArray)
{
    try
    {
        /*var msg = "";
        for (var idx = 0; idx < menuArray.length; idx++)
        {
            msg += "" + idx + ". " + menuArray[idx] + "\r\n";
        }
        alert(msg); */

        if (menuArray.length < 5)
        {
            alert ("메뉴는 5개 이상 입력되어야 합니다.");
            return;
        }

        // local storage clear
        for (var idx = 0; idx < 20; idx++)
        {
            SaveMenu(idx + 1, "");
        }

        // save
        for (var idx = 0; idx < menuArray.length; idx++)
        {
            SaveMenu(idx + 1, menuArray[idx]);
        }

        // 전역 복사
        _menuArray = menuArray;

        //
        SetTitle("달립니다.");
        
        //
        CreateBaseTrack();

        //
        CreateRunners();

        //
        _dayOfWeekInfo = new DayOfWeekInfo();
        _dayRankTable = new DayRankTable();

        //
        _timer = new RunnerTimer();
        _timer.Run();
    }
    catch (e)
    {
        alert("OnRun error: " + e);
        _menuArray = null;
        _tracks = null;
        _timer = null;
    }
    finally
    {

    }
}

// 기본 트랙 Div 만들기
function CreateBaseTrack()
{
    try
    {
        var mainObj = GetMainObj();
        var html = "";
        
        _tracks = new Array();
        for (var i = 1; i <= _menuArray.length; i++)
        {
            //html += "<div id='track" + i + "' style='background: #FF00FF; width: 200px; height: 100px; position: absolute; left: 10; top: 10'></div>";
            var track = new Track(i, _menuArray[i - 1]);
            html += track.Div();

            _tracks[i - 1] = track;
        }
        mainObj.innerHTML = html;

        //
        for (var i = 0; i < _tracks.length; i++)
        {
            _tracks[i].MakeTrackLine();
        }
    }
    catch (e)
    {
        alert("CreateBaseTrack error: " + e);
    }
    finally
    {

    }
}

// runner 생성
function CreateRunners()
{
    try
    {
        _runners = new Array();
        for (var i = 0; i < _tracks.length; i++)
        {
            _runners[i] = new Runner(_tracks[i]);
            _runners[i].MakeRunner();
        }
    }
    catch (e)
    {
        alert("CreateRunners error: " + e);
        _runners = null;
    }
    finally
    {

    }
}

// timer
var RunnerTimer = function()
{
    this._timer = null;
    this.Run = function()
    {
        try
        {
           this.Stop();
           this._timer = setInterval(this.OnTimer, 100);
        }
        catch (e)
        {
            this.Stop();
            alert("this.Run error: " + e);
        }
        finally
        {

        }
    };
    this.Stop = function()
    {
        try
        {
            console.log("1");
            if (this._timer != null)
            {
                console.log("2");
               clearInterval(this._timer);
            }
        }
        catch (e)
        {
            alert("this.Stop error: " + e);
        }
        finally
        {
            this._timer = null;
        }
    };
    this.OnTimer = function()
    {
        try
        {
            var moveCount = 0;
            for (var i = 0; i < _runners.length; i++)
            {
                if (_runners[i].Move() == true)
                {
                    moveCount++;
                }
                //console.log(runnerObj._left);
                //console.log(runnerObj.style.left);
            }

            //
            if (moveCount == 0)
            {
                _timer.Stop();
                SetTitle("주간 메뉴 결정이 끝났습니다.");
                //alert("주간 메뉴 결정이 끝났습니다.");
            }
        }
        catch (e)
        {
            console.log("this.OnTimer error: " + e);
        }
        finally
        {
        }
        
    }
}

// 
var Runner = function(track)
{
    this._track = track;
    this._frameIndex = 0;
    this._id = "runner" + this._track._no;
    this._imgId = "runnerImg" + this._track._no;
    this._dayOfWeekId = "dow" + this._track._no;
    this._menu = this._track._menu;
    this._left = 5;
    this.GetNewLeft = function() // auto increase
    {
        try
        {
            this._left += Math.floor(Math.random() * 8) + 2;
        }
        catch (e)
        {
            alert("this.GetLeft error: " + e);
        }
        finally
        {

        }

        return this._left;
    }
    this._frameArray = new Array();
    for (var i = 1; i <= 4; i++)
    {
        this._frameArray[i - 1] = "./res/run0" + i + ".png";
    }
    this.Img = function()
    {
        return "<img id='" + this._imgId + "' src='" + this._frameArray[0] + "'>";
    };
    this._imgObj = null;
    this.GetImgObj = function()
    {
        try
        {
           if (this._imgObj == null)
           {
               this._imgObj = document.getElementById(this._imgId);
           }
        }
        catch (e)
        {
            this._imgObj = null;
            console.log("this.GetImgObj error: " + e);
        }
        finally
        {

        }

        return this._imgObj;
    };
    this.ChangeImgSrc = function()
    {
        try
        {
           if (this._imgObj == null) { this.GetImgObj(); }

           this._frameIndex++;
           if (this._frameIndex >= 4) { this._frameIndex = 0; }

           this._imgObj.src = this._frameArray[this._frameIndex];
        }
        catch (e)
        {
            console.log("this.ChangeImgSrc error: " + e);
        }
        finally
        {

        }
    };
    this.SetImgSrc = function(idx)
    {
        try
        {
           if (this._imgObj == null) { this.GetImgObj(); }
           this._imgObj.src = this._frameArray[idx];
        }
        catch (e)
        {
            console.log("this.SetImgSrc error: " + e);
        }
        finally
        {

        }
    };
    this.MakeRunner = function()
    {
        try
        {
           var trackObj = this._track.GetTrackObj();

           // menu text
           var htmlMenu = "<div>" + this._menu + "</div>";

           // day
           var htmlDay = "<div id='" + this._dayOfWeekId + "'>?</div>";

           // character
           var htmlImg = "<div>" + this.Img() + "</div>";

           // div
           var htmlDiv = "<div id='" + this._id + "' style='position: relative; left: " + this._left + "px; top: 15px;'>" 
            + htmlMenu + htmlDay + htmlImg + "</div>";

           //
           trackObj.innerHTML += htmlDiv;
        }
        catch (e)
        {
            alert("this.MakeTrackLine error: " + e);
        }
        finally
        {

        }
    };
    this._runnerObj = null;
    this.GetRunnerObj = function()
    {
        try
        {
           if (this._runnerObj == null)
           {
               this._runnerObj = document.getElementById(this._id);
           }
        }
        catch (e)
        {
            this._runnerObj = null;
            alert("this.GetRunnerObj error: " + e);
        }
        finally
        {

        }

        return this._runnerObj;
    };
    this.SetDayOfWeek = function()
    {
        try
        {
           var dowObj = document.getElementById(this._dayOfWeekId);
           dowObj.innerHTML = _dayOfWeekInfo.GetDayOfWeek();
        }
        catch (e)
        {
            alert("this.SetDayOfWeek error: " + e);
        }
        finally
        {

        }
    };
    this._moveLimit = 800;
    this._isFinished = false;
    this.Move = function()
    {
        try
        {
            if (this._isFinished == true) { return false; }
            if (this._left > this._moveLimit)
            {
                this.SetDayOfWeek();
                this.SetImgSrc(0);
                this._isFinished = true;
                _dayRankTable.SetMenu(this._menu);
                return false;
            }

            this.GetNewLeft();
            if (this._runnerObj == null) { this.GetRunnerObj(); }

            this._runnerObj.style.left = this._left + "px";
            
            //
            this.ChangeImgSrc();


            return true;
        }
        catch (e)
        {
            console.log("this.Move error: " + e);
        }
        finally
        {

        }

        return false;
    };
}

// 트랙 클래스
var Track = function(no, menu)
{
    this._menu = menu;
    this._no = no;
    this._left = 10;
    this._width = 800;
    this._height = 100;
    this.Id = function()
    {
        return "track" + this._no;
    };
    this.Top = function()
    {
        var top = (this._height * this._no) + ((this._no >= 1) ? this._no : 0);
        //alert(top);
        return top;
    };
    /*this._Right = function()
    {
        return this._width;
    };*/
    this.Div = function()
    {
        return "<div id='" + this.Id() + "' style='background: ; width: " + this._width + "px; height: " + this._height + "px; position: absolute; left: " + this._left + "px; top: " + this.Top() + "px'></div>";
    };
    this.GetTrackObj = function()
    {
        return document.getElementById(this.Id());
    }
    this.MakeTrackLine = function()
    {
        try
        {
           var trackObj = this.GetTrackObj();

           // lefts
           var htmlLeft = "<div style='background: #252525; position: absolute; left: 0px; top: 0px; width: 3px; height: " + this._height + "px'></div>";

           // right
           var htmlRight = "<div style='background: #252525; position: absolute; left: " + (this._width - 3) + "px; top: 0px; width: 3px; height: " + this._height + "px'></div>";

           // bottom
           var htmlBottom = "<div style='background: #252525; position: absolute; left: 0px; top: " + (this._height - 3) + "px; width: " + this._width + "px; height: 3px'></div>";

           //
           trackObj.innerHTML = htmlLeft + htmlRight + htmlBottom;
        }
        catch (e)
        {
            alert("this.MakeTrackLine error: " + e);
        }
        finally
        {

        }
    };
};

// 요일 반환 클래스
var DayOfWeekInfo = function()
{
    this._idx = 0;
    this.GetDayOfWeek = function()
    {
        switch (this._idx)
        {
            case 0:
                this._idx++;
                return "월요일";

            case 1:
                this._idx++;
                return "화요일";

            case 2:
                this._idx++;
                return "수요일";
            
            case 3:
                this._idx++;
                return "목요일";

            case 4:
                this._idx++;
                return "금요일";

            default:
                break;
        }

        return "제외";
    }
};

// 요일 테이블 클래스
var DayRankTable = function()
{
    this.Ctor = function()
    {
        try
        {
            var mainObj = GetMainObj();

            // title
            var htmlTitle = "<div style='background: #FF2222; width: 120px'><p style='text-align: center;'>결과</p></div>";

            //
            var htmlDivs = "";
            var dayOfWeek = "";
            for (var i = 0; i < 5; i++)
            {
                if (i == 0) { dayOfWeek = "월요일"; }
                else if (i == 1) { dayOfWeek = "화요일"; }
                else if (i == 2) { dayOfWeek = "수요일"; }
                else if (i == 3) { dayOfWeek = "목요일"; }
                else if (i == 4) { dayOfWeek = "금요일"; }

                htmlDivs += "<div id='dayRank" + i + "'>" + dayOfWeek + ":  ??</div>";
            }

            mainObj.innerHTML += "<div style='position: absolute; top: 101px; left: 888px;'>" + htmlTitle + htmlDivs + "</div>";
        }
        catch (e)
        {
            console.log("DayRandTable.Ctor error: " + e);
        }
    };
    this.Ctor();

    this.GetDayOfWeek = function(idx)
    {
        switch (idx)
        {
            case 0:
                return "월요일";

            case 1:
                return "화요일";

            case 2:
                return "수요일";
            
            case 3:
                return "목요일";

            case 4:
                return "금요일";

            default:
                break;
        }

        return "";
    };

    this._currentIdx = 0;
    this.SetMenu = function(menu)
    {
        try
        {
            var dayRankObj = document.getElementById("dayRank" + this._currentIdx);
            dayRankObj.innerHTML = this.GetDayOfWeek(this._currentIdx) + ": " + menu;
            this._currentIdx++;
        }
        catch (e)
        {
            console.log("DayRandTable.Ctor error: " + e);
        }
    };
};