const studyScript = {
    category: $('#category').val(),
    page: $('#page').val(),
    editor : {
        id: 'editor',
        editor: [],
    },
    init : async function() {
        this.setCommonEvent();
        this.loadFile();
    },

    setCommonEvent : function() {
        $('#updateBtn').click(function() {
            let fileInfo = studyScript.editor.editor.getById[studyScript.editor.id].getIR();
            studyScript.save(fileInfo, true);
        });

        $('#pdfBtn').click(function() {
            let editorBody = $(`#${studyScript.editor.id}`).next('iframe').contents().find('iframe').contents().find('body.se2_inputarea')[0];
            pdfExport(editorBody);
        });
    },

    loadFile : async function() {
        let param = {
            filePath: `public/save/study/${studyScript.category}/${studyScript.page}.html`
        };

        let response = await fetch('/loadFile'
            , {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json;charset=utf-8'
                },
                body: JSON.stringify(param),
            }
        );

        let resultData = await response.json();
        if(response.ok) {
            setEditor(studyScript.editor, resultData.fileInfo, true);
        } else {
            if(resultData.message == 'notexist') {
                studyScript.save('', false);
            } else {
                alertDialog('시스템 오류 발생');
            }
        }
    },

    save : async function(fileInfo, updateFlag) {
        let param = {
            filePath: `public/save/study/${studyScript.category}/`,
            fileName : `${studyScript.page}.html`,
            fileInfo: fileInfo ? fileInfo : '',
        };
    
        let response = await fetch('/save'
            , {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json;charset=utf-8'
                },
                body: JSON.stringify(param),
            }
        );
    
        if(response.ok) {
            if(updateFlag) {
                alertDialog('수정완료');
            } else {
                await studyScript.loadFile();
            }
        } else {
            alertDialog('시스템 오류 발생');
        }
    },
}

studyScript.init();