class periodData {
    name = '';
    careerType = '';
    careerTypeStr = '';
    startDate = '';
    endDate = '';
    object;
    constructor(name, careerType, startDate, endDate, object) {
        this.name = name;
        this.careerType = careerType;
        this.startDate = startDate;
        this.endDate = endDate;
        this.object = object;
        if(careerType) {
            if(careerType == 'teach') {
                this.careerTypeStr = '강의';
            } else if(careerType == 'office') {
                this.careerTypeStr = '실무';
            }
        }
    }
}

const careerCalculatorScript = {
    filePath : 'public/save/careerCalculator/',
    realFileName : '',
    loadFileInfo : null,
    editor : {
        id: 'editor',
        editor: [],
    },
    fileUploader: null,

    init : async function() {
        this.changeLoadFileInfo();
        this.setCommonEvent();
        this.addRow('education');
        this.addRow('career');
        this.setMemoInfo();
        // await this.setSample();
        // await this.calculate();
    },

    setMemoInfo : function() {
        if(careerCalculatorScript.editor.editor.length > 0) {
            $(`#${careerCalculatorScript.editor.id}`).text(careerCalculatorScript.loadFileInfo?.memo ?? '');
            careerCalculatorScript.editor.editor.getById[careerCalculatorScript.editor.id].exec("LOAD_CONTENTS_FIELD");
        } else {
            setEditor(careerCalculatorScript.editor, careerCalculatorScript.loadFileInfo?.memo ?? '', true);
        }

        careerCalculatorScript.fileUploader = new FileUploader({
            id: 'fileuploader', 
            fileList : careerCalculatorScript.loadFileInfo?.fileList ?? [], 
            uploadAuth : true,
            totalMaxSize : 10737418240,
        });
    },

    setCommonEvent : function() {
        $('[name="addRowBtn"]').click(function() {
            let type = $(this).attr('type');
            careerCalculatorScript.addRow(type);
        });
    
        $('#setResultBtn').click(function() {
            careerCalculatorScript.calculate();
        });
    
        $('#setSampleBtn').click(function() {
            careerCalculatorScript.setSample();
        });

        $('#resetBtn').click(function() {
            careerCalculatorScript.reset();
        });
    
        $('#saveBtn').click(function() {
            $('#file_name').val(careerCalculatorScript.loadFileInfo?.fileName ?? '');            

            $('#save_dialog').dialog({
                width: 240,
                title: '저장',
                modal: true,
                resizable: false,
                draggable: false,
                buttons: [
                    {
                        text: `저장`,
                        click: function() {
                            if($('#file_name').val().trim() != '') {
                                careerCalculatorScript.save();
                            } else {
                                alertDialog('저장명을 입력해주세요.');
                            }
                        }
                    }
                  ]
            });
        });
    
        $('#loadBtn').click(function() {
            careerCalculatorScript.load();
        });
    },

    load : async function() {
        let param = {
            filePath: careerCalculatorScript.filePath,
        };

        let response = await fetch('/load'
            , {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json;charset=utf-8'
                },
                body: JSON.stringify(param),
            }
        );

        if(response.ok) {
            let resultData = await response.json();
            resultData.fileData.map(v => {v.fileInfo = JSON.parse(v.fileInfo)});
            resultData.fileData = _.sortBy(resultData.fileData, 'realFileName').reverse();

            $('#load_dialog').html(Mustache.render($('#load_dialog_template').html(), {fileData : resultData.fileData}));
            $('#load_dialog').dialog({
                title: '불러오기',
                width: 450,
                modal: true,
                resizable: false,
                draggable: false,
            });

            $('[name="load_link"]').click(function() {
                let realFileName = $(this).closest('ul').attr('realFileName');
                let fileInfo = resultData.fileData.find(v => v.realFileName == realFileName).fileInfo;
                careerCalculatorScript.loadData(realFileName, fileInfo);
            });

            $('.delete_load').click(function() {
                if(confirm('삭제하시겠습니까?')) {
                    let realFileName = $(this).closest('ul').attr('realFileName');
                    careerCalculatorScript.delete(realFileName);
                }
            });
        } else {
            alertDialog('시스템 오류 발생');
        }
    },

    save : async function() {
        $('.loading-layer').show();

        careerCalculatorScript.fileUploader.upload(async function(fileList) {
            let educationDataList = new Array();
            $('table.education-table').find('tbody').find('tr').each(function() {
                let trObj = $(this);
                educationDataList.push(new periodData(trObj.find('[name="search_name"]').val(), null, trObj.find('[name="search_start_date"]').val(), trObj.find('[name="search_end_date"]').val(), trObj));
            });

            let careerDataList = new Array();
            $('table.career-table').find('tbody').find('tr').each(function() {
                let trObj = $(this);
                careerDataList.push(new periodData(trObj.find('[name="search_name"]').val(), trObj.find('[name="career_type"]').val(), trObj.find('[name="search_start_date"]').val(), trObj.find('[name="search_end_date"]').val(), trObj));
            });

            fileList = fileList.reduce((acc,cur,i) => {
                if(!(cur.uploaded && cur.use_yn == 'N')) {
                    acc.push(cur);
                }
                return acc;
            }, []);

            let fileInfo = {
                fileName: $('#file_name').val().trim(),
                career: careerDataList,
                education: educationDataList,
                regDate : careerCalculatorScript.getRegDate(),
                memo: careerCalculatorScript.editor.editor.getById[careerCalculatorScript.editor.id].getIR(),
                fileList,
            };

            let param = {
                filePath: careerCalculatorScript.filePath, 
                fileInfo: JSON.stringify(fileInfo),
            };

            if(careerCalculatorScript.loadFileInfo) {
                $.extend(param, {realFileName: careerCalculatorScript.loadFileInfo.realFileName, uploaded: true});
            } else {
                $.extend(param, {realFileName: careerCalculatorScript.getRealFileName(), uploaded: false});
            }

            let response = await fetch('/save'
                , {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(param),
                }
            );

            $('.loading-layer').hide();

            if(response.ok) {
                careerCalculatorScript.loadFileInfo = $.extend(fileInfo, {realFileName: param.realFileName});
                careerCalculatorScript.changeLoadFileInfo();
                careerCalculatorScript.setMemoInfo();
                alertDialog('저장완료');
                $('#save_dialog').dialog('close');
            } else {
                alertDialog('시스템 오류 발생');
            }
        });
    },

    changeLoadFileInfo : function() {
        if(careerCalculatorScript.loadFileInfo) {
            $('.careerCalculator-header-divider').show();
            $('.careerCalculator-header-loadFileInfo').show();
            $('.careerCalculator-header-loadFileInfo.fileName').text(careerCalculatorScript.loadFileInfo.fileName);
            $('.careerCalculator-header-loadFileInfo.regDate').text(careerCalculatorScript.loadFileInfo.regDate);
        } else {
            $('.careerCalculator-header-divider').hide();
            $('.careerCalculator-header-loadFileInfo').hide();
            $('.careerCalculator-header-loadFileInfo').text('');
        }
    },

    getRegDate : function() {
        let dateArr = careerCalculatorScript.getDateArr();
        return `${dateArr[0]}-${dateArr[1]}-${dateArr[2]} ${dateArr[3]}:${dateArr[4]}`;
    },

    getRealFileName : function() {
        let dateArr = careerCalculatorScript.getDateArr();
        let realFileName = dateArr.join('') + Math.floor(Math.random() * 100000) + '.json';
        return realFileName;
    },

    getDateArr : function() {
        let date = new Date();

        let year = date.getFullYear().toString();
        let month = date.getMonth()+1;
        let day = date.getDate();
        let hour = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        month = month >= 10 ? month.toString() : '0' + month;
        day = day >= 10 ? day.toString() : '0' + day;	
        hour = hour >= 10 ? hour.toString() : '0' + hour;
        minutes = minutes >= 10 ? minutes.toString() : '0' + minutes;
        seconds = seconds >= 10 ? seconds.toString() : '0' + seconds;

        return [year,month,day,hour,minutes,seconds];
    },

    loadData : function(realFileName, fileInfo) {
        careerCalculatorScript.loadFileInfo = $.extend(fileInfo, {realFileName});
        careerCalculatorScript.changeLoadFileInfo();

        $('div.result-area').html('');
        $('table.education-table').find('tbody').find('tr').remove();
        $('table.career-table').find('tbody').find('tr').remove();

        fileInfo.education.map((v,i) => {
            careerCalculatorScript.addRow('education');
            let trObj = $('table.education-table').find('tbody').find('tr').eq(i);
            trObj.find('[name="search_name"]').val(v.name);
            trObj.find('[name="search_start_date"]').val(v.startDate);
            trObj.find('[name="search_end_date"]').val(v.endDate);
        });

        fileInfo.career.map((v,i) => {
            careerCalculatorScript.addRow('career');
            let trObj = $('table.career-table').find('tbody').find('tr').eq(i);
            trObj.find('[name="search_name"]').val(v.name);
            trObj.find('[name="career_type"]').val(v.careerType);
            trObj.find('[name="search_start_date"]').val(v.startDate);
            trObj.find('[name="search_end_date"]').val(v.endDate);
        });

        careerCalculatorScript.setMemoInfo();

        $('#load_dialog').dialog('close');
    },

    delete : async function(realFileName) {
        let param = {
            filePath: careerCalculatorScript.filePath,
            realFileName,
        };

        let response = await fetch('/delete'
            , {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json;charset=utf-8'
                },
                body: JSON.stringify(param),
            }
        );

        if(response.ok) {
            if(realFileName == careerCalculatorScript.loadFileInfo?.realFileName) {
                careerCalculatorScript.loadFileInfo = null;
                careerCalculatorScript.changeLoadFileInfo();
            }
            careerCalculatorScript.load();
        } else {
            alertDialog('시스템 오류 발생');
        }
    },

    setSample : async function() {
        $('table.education-table').find('tbody').find('tr').remove();
        $('table.career-table').find('tbody').find('tr').remove();

        careerCalculatorScript.addRow('education');
        careerCalculatorScript.addRow('education');
        careerCalculatorScript.addRow('education');
        careerCalculatorScript.addRow('career');
        careerCalculatorScript.addRow('career');
        careerCalculatorScript.addRow('career');

        let educationDataList = new Array();
        let careerDataList = new Array();

        educationDataList.push(new periodData('학사',null,'1978-03-06','1984-08-25'));
        educationDataList.push(new periodData('석사',null,'2006-02-27','2008-02-27'));
        educationDataList.push(new periodData('박사',null,'2009-03-02','2018-08-17'));

        careerDataList.push(new periodData('A기관(시간강사)','teach','2003-03-01','2009-08-31'));
        careerDataList.push(new periodData('B기관(겸임교수)','office','2005-03-01','2018-02-28'));
        careerDataList.push(new periodData('C기관(시간강사)','teach','2011-02-28','2019-01-16'));

        educationDataList.map((v,i) => {
            let trObj = $('table.education-table').find('tbody').find('tr').eq(i);
            trObj.find('[name="search_name"]').val(v.name);
            trObj.find('[name="search_start_date"]').val(v.startDate);
            trObj.find('[name="search_end_date"]').val(v.endDate);
        });

        careerDataList.map((v,i) => {
            let trObj = $('table.career-table').find('tbody').find('tr').eq(i);
            trObj.find('[name="search_name"]').val(v.name);
            trObj.find('[name="career_type"]').val(v.careerType);
            trObj.find('[name="search_start_date"]').val(v.startDate);
            trObj.find('[name="search_end_date"]').val(v.endDate);
        });
    },

    reset : async function() {
        careerCalculatorScript.loadFileInfo = null;
        careerCalculatorScript.changeLoadFileInfo();
        careerCalculatorScript.setMemoInfo();

        $('table.education-table').find('tbody').find('tr').remove();
        $('table.career-table').find('tbody').find('tr').remove();

        careerCalculatorScript.addRow('education');
        careerCalculatorScript.addRow('career');

        $('.result-area').html('');
    },

    addRow : function(type) {
        $(`table.${type}-table`).find('tbody').append(Mustache.render($('#tr_template').html(), {careerYn: type == 'career' ? true : false}));
        let addedTr = $(`table.${type}-table`).find('tr:last');
        addedTr.find('.search-date').datepicker({
            buttonImageOnly: true,
            changeMonth: true,
            changeYear: true,
            nextText: '다음 달',
            prevText: '이전 달',
            numberOfMonths: [1,1],
            stepMonths: 1,
            yearRange: 'c-10:c+0',
            dateFormat: "yy-mm-dd",
            showMonthAfterYear: true,
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
        });

        addedTr.find('button.delRowBtn').off().click(function() {
            $(this).closest('tr').remove();
            careerCalculatorScript.setRownum(type);
        });

        careerCalculatorScript.setRownum(type);
    },

    setRownum : function(type) {
        $(`table.${type}-table`).find('tbody').find('tr').each(function(i) {
            $(this).find('td:first').text(i+1);
        });
    },

    calculate : async function() {
        let educationDataList = new Array();
        $('table.education-table').find('tbody').find('tr').each(function() {
            let trObj = $(this);
            educationDataList.push(new periodData(trObj.find('[name="search_name"]').val(), null, trObj.find('[name="search_start_date"]').val(), trObj.find('[name="search_end_date"]').val(), trObj));
        });

        let careerDataList = new Array();
        $('table.career-table').find('tbody').find('tr').each(function() {
            let trObj = $(this);
            careerDataList.push(new periodData(trObj.find('[name="search_name"]').val(), trObj.find('[name="career_type"]').val(), trObj.find('[name="search_start_date"]').val(), trObj.find('[name="search_end_date"]').val(), trObj));
        });

        if(!careerCalculatorScript.validation([...educationDataList, ...careerDataList])) {
            alertDialog('필수 입력 항목을 모두 입력 또는 포맷(yyyy-mm-dd)에 맞게 입력해 주세요.');
            return;
        }

        let educationDateList = new Array();
        
        for await (educationData of educationDataList) {
            let startDate = new Date(educationData.startDate);
            let endDate = new Date(educationData.endDate);

            let loopCnt = 0;
            while(dateFormat(endDate, 'int') >= dateFormat(startDate, 'int')) {
                if(loopCnt > 1000000) {
                    break;
                }
                if(educationDateList.indexOf(dateFormat(startDate)) == -1) {
                    educationDateList.push(dateFormat(startDate));
                }
                startDate.setDate(startDate.getDate() + 1);
                loopCnt++;
            }
        }

        let teachCareerDateList = new Array();
        let officeCareerDateList = new Array();

        let educationDuplDateList = new Array();
        let careerDuplDateList = new Array();

        for await (careerData of careerDataList) {
            let startDate = new Date(careerData.startDate);
            let endDate = new Date(careerData.endDate);

            let loopCnt = 0;
            let dateCnt = 0;
            while(dateFormat(endDate, 'int') >= dateFormat(startDate, 'int')) {
                if(loopCnt > 1000000) {
                    break;
                }

                if(educationDateList.indexOf(dateFormat(startDate)) > -1) {
                    if(educationDuplDateList.indexOf(dateFormat(startDate)) == -1) {
                        educationDuplDateList.push(dateFormat(startDate));
                    }
                } else {
                    if(careerData.careerType == 'teach') {
                        if(teachCareerDateList.indexOf(dateFormat(startDate)) == -1) {
                            teachCareerDateList.push(dateFormat(startDate));
                            dateCnt++;
                        } else {
                            if(careerDuplDateList.indexOf(dateFormat(startDate)) == -1) {
                                careerDuplDateList.push(dateFormat(startDate));
                            }
                        }
                    } else if(careerData.careerType == 'office') {
                        if(officeCareerDateList.indexOf(dateFormat(startDate)) == -1) {
                            officeCareerDateList.push(dateFormat(startDate));
                        } else {
                            if(careerDuplDateList.indexOf(dateFormat(startDate)) == -1) {
                                careerDuplDateList.push(dateFormat(startDate));
                            }
                        }
                    }
                }
                startDate.setDate(startDate.getDate() + 1);
                loopCnt++;
            }
            careerData.dateCnt = dateCnt;
        }

        officeCareerDateList = officeCareerDateList.reduce((acc,cur,i) => {
            if(teachCareerDateList.indexOf(cur) > -1) {
                if(careerDuplDateList.indexOf(cur) == -1) {
                    careerDuplDateList.push(cur);
                }
            } else {
                acc.push(cur);
            }
            return acc;
        },[]);

        officeCareerDateList.map(v => {
            for(let i=0; i<careerDataList.length; i++) {
                careerData = careerDataList[i];

                let continueFlag = true;
                if(careerData.careerType == 'office') {
                    let startDate = new Date(careerData.startDate);
                    let endDate = new Date(careerData.endDate);

                    let loopCnt = 0;

                    while(dateFormat(endDate, 'int') >= dateFormat(startDate, 'int')) {
                        if(loopCnt > 1000000) {
                            break;
                        }

                        if(v == dateFormat(startDate)) {
                            careerData.dateCnt++;
                            continueFlag = false;
                            break;
                        }
                        
                        startDate.setDate(startDate.getDate() + 1);
                        loopCnt++;
                    }
                }
                if(!continueFlag) break;
            }
        });

        careerDataList.map((v,i) => {
            v.no = i+1;

            v.monthCnt = parseInt(v.dateCnt / 30 * 10) / 10;

            if(v.careerType == 'teach') {
                v.calculateDateCnt = parseInt(v.dateCnt * 0.7);
            } else if(v.careerType == 'office') {
                v.calculateDateCnt = parseInt(v.dateCnt * 0.5);
            }

            v.calculateYearCnt = Math.round(v.calculateDateCnt / 360 * 10) / 10;
            v.calculateDateStr = careerCalculatorScript.dateCntToStr(v.calculateDateCnt);
        });

        teachCareerDateList = teachCareerDateList.sort().reduce((acc,cur,i) => {
            acc.push({no:i+1, date: cur});
            return acc;
        },[]);

        officeCareerDateList = officeCareerDateList.sort().reduce((acc,cur,i) => {
            acc.push({no:i+1, date: cur});
            return acc;
        },[]);

        educationDuplDateList = educationDuplDateList.sort().reduce((acc,cur,i) => {
            acc.push({no:i+1, date: cur});
            return acc;
        },[]);
        
        careerDuplDateList = careerDuplDateList.sort().reduce((acc,cur,i) => {
            acc.push({no:i+1, date: cur});
            return acc;
        },[]);

        let totalDateCnt = teachCareerDateList.length + officeCareerDateList.length;
        let totalMonthCnt = parseInt(totalDateCnt / 30 * 10) / 10;
        let calculateDateCnt = parseInt((teachCareerDateList.length * 0.7) + (officeCareerDateList.length * 0.5));
        let calculateTotalYearCnt = Math.round(calculateDateCnt / 360 * 10) / 10;

        let calculateStr = `
            강의경력:  ${teachCareerDateList.length} * 0.7 = ${teachCareerDateList.length * 0.7}<br/>
            실무경력:  ${officeCareerDateList.length} * 0.5 = ${officeCareerDateList.length * 0.5}<br/>
            강의경력(${teachCareerDateList.length * 0.7}) + 실무경력(${officeCareerDateList.length * 0.5}) = ${calculateDateCnt}
        `;

        let resultInfo = {
            careerDataList,
            careerDataExistYn: careerDataList.length > 0,
            educationDuplCnt: educationDuplDateList.length,
            careerDuplDateCnt: careerDuplDateList.length,
            educationDuplArr: careerCalculatorScript.setTableListArr(educationDuplDateList),
            careerDuplDateArr: careerCalculatorScript.setTableListArr(careerDuplDateList),

            teachCareerDateCnt: teachCareerDateList.length,
            officeCareerDateCnt: officeCareerDateList.length,
            teachCareerDateArr: careerCalculatorScript.setTableListArr(teachCareerDateList),
            officeCareerDateArr: careerCalculatorScript.setTableListArr(officeCareerDateList),

            totalDateCnt,
            totalMonthCnt,
            calculateDateCnt,
            calculateTotalYearCnt,
            calculateDateStr: careerCalculatorScript.dateCntToStr(calculateDateCnt),
            calculateStr,
        };

        $('.result-area').html(Mustache.render($('#result_template').html(), resultInfo));

        $('[name="contentsShowBtn"]').click(function() {
            if($(this).text() == '+') {
                $(this).closest('table').find('tbody').show();
                $(this).text('-');
            } else {
                $(this).closest('table').find('tbody').hide();
                $(this).text('+');
            }
        });
    },

    setTableListArr : function(list) {
        let returnArr = new Array();
        let divideCnt = parseInt(list.length / 5);
    
        if(divideCnt == 0) {
            if(list.length != 0) returnArr.push({list: [...list]});
        } else {
            for(let i=1; i<=5; i++) {
                let startIndex = i == 1 ? 0 : (i-1) * divideCnt;
                if((i+1) * divideCnt >= list.length) {
                    returnArr.push({list: [...(list.slice(startIndex, list.length))]});
                    break;
                } else {
                    returnArr.push({list: [...(list.slice(startIndex, i*divideCnt))]})
                }
            }
        }
        returnArr.map(v => {
            v.width = parseInt(100 / returnArr.length) - 1;
        });
        return returnArr;
    },

    dateCntToStr : function(cnt) {
        let year = parseInt((cnt/30)/12);
        let month = parseInt((cnt/30)%12);
        let date = cnt%30;

        let dateStr = new Array();
        if(year) dateStr.push(`${year}년`);
        if(month) dateStr.push(`${month}개월`);
        if(date) dateStr.push(`${date}일`);

        return dateStr.join(' ');
    },

    validation : function(list) {
        const dateRegexp = /(^\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

        let result = list.reduce((acc,cur,i) => {
            if(cur.startDate.trim() == '' || !dateRegexp.test(cur.startDate)) {
                cur.object.find('[name="search_start_date"]').closest('td').css('background','#f7bbbb');
                acc = false;
            } else {
                cur.object.find('[name="search_start_date"]').closest('td').css('background','');
            }
    
            if(cur.endDate.trim() == '' || !dateRegexp.test(cur.endDate)) {
                cur.object.find('[name="search_end_date"]').closest('td').css('background','#f7bbbb');
                acc = false;
            } else {
                cur.object.find('[name="search_end_date"]').closest('td').css('background','');
            }
            return acc;
        }, true);    
        return result;
    },

    dateKeyupFunc : function(obj) {
        if(event.keyCode != 8) {
            if(obj.value.replace(/[0-9 \-]/g, "").length == 0) {
                let number = obj.value.replace(/[^0-9]/g,"");
                let ymd = "";
                if(number.length < 4) {
                    return number;
                } else if(number.length < 6){
                    ymd += number.substr(0, 4);
                    ymd += "-";
                    ymd += number.substr(4);
                } else {
                    ymd += number.substr(0, 4);
                    ymd += "-";
                    ymd += number.substr(4, 2);
                    ymd += "-";
                    ymd += number.substr(6);
                }
                obj.value = ymd;
            } else {
                alertDialog("숫자 이외의 값은 입력하실 수 없습니다.");
                obj.value = obj.value.replace(/[^0-9 ^\-]/g,"");
                return false;
            }
        } else {
            return false;
        }
    },
}

careerCalculatorScript.init();