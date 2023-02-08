const editorScript = {
    filePath : 'public/save/editor/',

    editor : {
        id: 'editor',
        editor: [],
    },

    fileName : '',

    init : async function() {
        this.changeButtonCss();
        this.setCommonEvent();
        this.setEditor(editorScript.editor, '', true);
    },

    setCommonEvent : function() {
        $('#saveBtn').click(function() {
            $('#file_name').val(getDefaultFileName());
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
                                editorScript.save(false);
                            } else {
                                alertDialog('저장명을 입력해주세요.');
                            }
                        }
                    }
                  ]
            });
        });
    
        $('#loadBtn').click(function() {
            editorScript.load();
        });

        $('#updateBtn').click(function() {
            editorScript.save(true);
        });

        $('#newBtn').click(function() {
            $(`#${editorScript.editor.id}`).text('');
            editorScript.editor.editor.getById[editorScript.editor.id].exec("LOAD_CONTENTS_FIELD");
            editorScript.fileName = '';
            editorScript.changeButtonCss();
        });

        $('#pdfBtn').click(function() {
            editorScript.pdfExport();
        });

        $('#hwpBtn').click(function() {
            editorScript.hwpExport();
        });
    },

    load : async function() {
        let param = {
            filePath: editorScript.filePath,
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
            $('#load_dialog').html(Mustache.render($('#load_dialog_template').html(), {fileData : resultData.fileData.reverse()}));
            $('#load_dialog').dialog({
                title: '불러오기',
                width: 300,
                modal: true,
                resizable: false,
                draggable: false,
            });

            $('[name="load_link"]').click(function() {
                editorScript.fileName = $(this).text();
                let fileInfo = resultData.fileData.find(v => v.fileName == editorScript.fileName).fileInfo;
                editorScript.loadData(fileInfo);
            });

            $('.delete_load').click(function() {
                let fileName = $(this).closest('ul').find('[name="load_link"]').text();
                editorScript.delete(fileName);
            });
        } else {
            alertDialog('시스템 오류 발생');
        }
    },

    loadData : function(fileInfo) {
        $(`#${editorScript.editor.id}`).text(fileInfo);
        editorScript.editor.editor.getById[editorScript.editor.id].exec("LOAD_CONTENTS_FIELD");
        editorScript.changeButtonCss();
        $('#load_dialog').dialog('close');
    },

    delete : async function(fileName) {
        let param = {
            filePath: editorScript.filePath,
            fileName,
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
            editorScript.load();
        } else {
            alertDialog('시스템 오류 발생');
        }
    },

    save : async function(updateFlag) {
        let param = {
            filePath: editorScript.filePath,
            fileName : updateFlag ? editorScript.fileName : $('#file_name').val().trim() + '.html',
            fileInfo: editorScript.editor.editor.getById[editorScript.editor.id].getIR(),
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
                alertDialog('저장완료');
                $('#save_dialog').dialog('close');
                editorScript.fileName = param.fileName;
                editorScript.changeButtonCss();
            }
        } else {
            alertDialog('시스템 오류 발생');
        }
    },

    changeButtonCss : function() {
        $('.editor-button').hide();
        $('#loadBtn, #pdfBtn, #hwpBtn').show();
        
        if(editorScript.fileName) {
            $('h2.fileName').text(editorScript.fileName);
            $('#newBtn, #updateBtn').show();
        } else {
            $('h2.fileName').text('');
            $('#saveBtn').show();
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
    },

    pdfExport : function() {
        let editorBody = $(`#${editorScript.editor.id}`).next('iframe').contents().find('iframe').contents().find('body.se2_inputarea');
        
        const pdfDoc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            compress : true,
        });
        const pdfImgWidth = 208;
        const pdfMargin = 1;
        const pdfPosition = 1;

        html2canvas(editorBody[0] ,{
			allowTaint : true,	// cross-origin allow 
			useCORS : true,		// CORS 사용한 서버로부터 이미지 로드할 것인지 여부
			scale : 2,			// 기본 96dpi에서 해상도를 두 배로 증가

		}).then(function(canvas) {
			let pdfImgData = canvas.toDataURL('image/png');  
			let pdfImgHeight = canvas.height * pdfImgWidth / canvas.width;

			pdfDoc.addImage(pdfImgData, 'PNG', pdfMargin, pdfPosition, pdfImgWidth, pdfImgHeight, '', 'FAST');
            // pdfDoc.addPage();
            const fileName = `${dateFormat(new Date())}.pdf`;
            
            pdfDoc.save(fileName);
		});
    },

    hwpExport : function() {
        let editorBody = $(`#${editorScript.editor.id}`).next('iframe').contents().find('iframe').contents().find('body.se2_inputarea');
        let hwpHtml = `<html><head><meta charset='utf-8'></head><body>`;
        hwpHtml += editorBody.html();
        hwpHtml += `</body></html>`;

        let source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(hwpHtml);
		let fileDownload = document.createElement("a");
		document.body.appendChild(fileDownload);
		fileDownload.href = source;
        let fileName = `${dateFormat(new Date())}.hwp`;
		fileDownload.download = fileName;
		fileDownload.click();
		document.body.removeChild(fileDownload);
    },
}

editorScript.init();