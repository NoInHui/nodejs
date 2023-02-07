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
            studyScript.setEditor(studyScript.editor, resultData.fileInfo, true);
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
    
    setEditor : function(editor, content = '', writeAuth) {
        let sLang = "ko_KR";
        let htParams = {
            bUseVerticalResizer : false,		// 입력창 크기 조절바 사용 여부 (true:사용/ false:사용하지 않음)
            I18N_LOCALE : sLang,
            fOnBeforeUnload : function(){},		// submit alert 제거
            bUseToolbar: true,                  // 툴바 사용 여부 (true:사용/ false:사용하지 않음)
            bUseModeChanger: true,              // 모드 탭(Editor | HTML | TEXT) 사용 여부 (true:사용/ false:사용하지 않음)
        };
    
        nhn.husky.EZCreator.createInIFrame({
            oAppRef: editor.editor,
            elPlaceHolder: editor.id,
            sSkinURI: "/lib/smarteditor2/static/SmartEditor2Skin.html",	
            htParams : htParams,
            fOnAppLoad : function(){
                editor.editor.getById[editor.id].setDefaultFont("맑은고딕", 11);
                editor.editor.getById[editor.id].exec("PASTE_HTML", [content]);
    
                if(!writeAuth) {
                    editor.editor.getById[editor.id].exec("DISABLE_WYSIWYG");
                    editor.editor.getById[editor.id].exec("DISABLE_ALL_UI");
                }
    
                let editorBody = $(`#${editor.id}`).next('iframe').contents().find('iframe').contents().find('body.se2_inputarea');
                editorBody.html(editorBody.children('div').html());
                // $(`#${editor.id}`).next('iframe').contents().find('.se2_conversion_mode').find('.se2_converter').find('button.se2_to_text').closest('li').remove();
            },
            fCreator: "createSEditor2"
        });
    }
}

studyScript.init();