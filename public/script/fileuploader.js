class FileUploader {
    denyExtension = ['exe','jsp','js','ejs','php','aspx','bat','vbs','dll','jspx','asp','java','pdb'];
    newFileList = new Array();

    constructor(uploader) {
        // fileUploader = new FileUploader({
        //     id: 'file_upload',
        //     fileList : boardFileList,
        //     totalMaxSize : 1024,
        //     maxSize : 1024,
        //     allowExtension : ['png','pdf'],
        //     uploadAuth : true,
        // });

        this.id = uploader.id;
        this.fileList = uploader.fileList ?? [];
        this.fileList.map(file => {
            file.uploaded = true;
            return file;
        });

        this.totalMaxSize = uploader.totalMaxSize ?? 104857600; // 10MB
        // this.totalMaxSize = uploader.totalMaxSize ?? 1073741824; // 1GB
        // this.totalMaxSize = uploader.totalMaxSize ?? 10737418240; // 10GB

        this.maxSize = uploader.maxSize ?? null;

        this.allowExtension = uploader.allowExtension ?? [];
        this.uploadAuth = uploader.uploadAuth ?? true;

        if(!this.uploadAuth && this.fileList.length == 0) {
            this.nullInit();
        } else {
            this.init();
        }
    }

    nullInit() {
        if(!this.id || $(`#${this.id}`).length == 0) {
            alert('FileUploder Error');
        } else {
            $(`#${this.id}`).html(
                `
                    <div class="option_area">
                        <p class="file_null">첨부파일이 존재하지 않습니다.</p>
                    </div>
                `
            );
        }
    }

    init() {
        if(!this.id || $(`#${this.id}`).length == 0) {
            alert('FileUploder Error');
        } else {
            let totalFileSize = this.fileList.filter(v => v.use_yn == 'Y').reduce((acc,cur,i) => {
                acc += parseInt(cur.size);
                return acc;
            },0);
            
            $(`#${this.id}`).html(
                `
                    <div class="option_area">
                        <div class="file_upload">
                            <div>
                                <label class="button_upload">내 PC<span class="blind">에서 업로드</span><input id="button_fileUpload" type="file" class="blind button_fileUpload" multiple=""></label>
                                <label class="button_upload"><span class="button_zipDownload">모두저장</span></label>
                            </div>
                            <p class="description">
                                ${this.getFormatBytes(totalFileSize)}/${this.getFormatBytes(this.totalMaxSize)}
                            </p>
                        </div>
                    </div>
                `
            );
            this.setHtml();
        }
    }

    setHtml() {
        if(this.fileList.filter(v => v.use_yn == 'Y').length > 0) {
            $(`#${this.id}`).find('.file_upload').after(
                `
                    <div class="file_attachments expanded">
                        <div class="file_attachments_inner">
                            <div class="file_list_header">
                                <div class="file_list_header_title"><span class="text">파일명</span></div>
                                <div class="file_list_header_status"><span class="text">업로드 상태</span></div>
                                <div class="file_list_header_regAt"><span class="text">등록 일자</span></div>
                                <div class="file_list_header_volume"><span class="text">용량</span></div>
                                <div class="file_list_header_task"><button type="button" class="button_svg_delete"><span class="blind">전체 삭제</span></button></div>
                            </div>
                            <ul class="file_list">
                            </ul>
                        </div>
                    </div>
                `
            );

            this.fileList.filter(v => v.use_yn == 'Y').map(file => {
                this.appendFileListHtml(file);
            });

            if(!this.uploadAuth) {
                $(`#${this.id}`).find('.file_upload').find('#button_fileUpload').closest('.button_upload').remove();
                $(`#${this.id}`).find('.file_list_header').find('.file_list_header_status').remove();
                $(`#${this.id}`).find('.file_list_header').find('.file_list_header_task').remove();
                $(`#${this.id}`).find('.file_list').find('.task').remove();
                $(`#${this.id}`).find('.file_list').find('.file_status').remove();
            }
        } else {
            $(`#${this.id}`).find('.file_upload').after('<p class="file_drag">파일을 마우스로 끌어 오세요</p>');
        }

        if(this.uploadAuth) this.bindUploadEvent();
        this.bindDownloadEvent();
    }

    appendFileListHtml(file) {
        let html = `<li class="file_item" real_file_name="${file.real_file_name}">`;
        html += `       <div class="file_link">`;
        html += `           <div class="file_thumbnail"><em class="svg_file_ms_${this.getFileExtensionImg(file.file_name)}"><span class="blind">${file.file_extension}</span></em></div>`;
        html += `           <div class="file_info_area">`;
        html += `               <div class="file_title_wrap">`;
        html += `                   <button type="button" class="file_title">`;
        html += `                       <span class="text">${file.file_name}</span>`;
        html += `                   </button>`;
        html += `                   <span class="file_status">${this.getUploadStatusText(file.uploaded)}</span>`;

        html += `                   <span class="file_regAt">${file.reg_at}</span>`;

        html += `                   <span class="file_volume">${this.getFormatBytes(file.size)}</span>`;
        html += `               </div>`;
        html += `           </div>`;
        html += `       </div>`;
        html += `       <div class="task">`;
        html += `           <button type="button" class="button_svg_delete"><span class="blind">삭제</span></button>`;
        html += `       </div>`;
        html += `</li>`;
        
        $(`#${this.id}`).find('ul.file_list').append(html);
    }

    bindDownloadEvent() {
        const _class = this;
        
        $(`#${this.id}`).find('.file_list').find('.file_item').find('.file_title').on('click', function() {
            let file = _class.fileList.find(v => v.real_file_name == $(this).closest('.file_item').attr('real_file_name'));
            if(file.uploaded) {
                _class.singleDownload(file);  
            } else {
                alert('업로드 후 다운로드 가능합니다.');
            }
        });

        $(`#${this.id}`).find('.button_zipDownload').on('click', function() {
            _class.zipCreate();
        });
    }

    singleDownload(file) {
        window.location = `/file/singleDownload?file_path=${file.file_path}&file_name=${file.file_name}`;    
    }

    zipCreate() {
        const _class = this;
        let fileList = _class.fileList.filter(file => file.uploaded && file.use_yn == 'Y');

        axios({
            url: `/file/zipCreate`,
            method: 'POST',
            data: fileList
        }).then(
            response => {
                if(response.status == 200) {
                    _class.singleDownload(response.data);
                }
            },
        ).catch(
            error => {
                alert('zip 다운로드 오류');
                console.log('zip download error', error);
                if($('.loading-layer').length > 0) {
                    $('.loading-layer').hide();
                }
            }
        );
    }

    bindUploadEvent() {
        const _class = this;
        const rootEle = document.getElementById(_class.id);
        const fileLength = this.fileList.filter(v => v.use_yn == 'Y').length;
        let uploadBox = fileLength > 0 ? rootEle.querySelector('ul.file_list') : rootEle.querySelector('.file_drag');

        ['dragenter', 'dragover', 'dragleave', 'drop'].map(eventName => uploadBox.addEventListener(eventName, preventDefaults, false));
        uploadBox.addEventListener('drop', handleDrop, false);

        rootEle.querySelector('.button_fileUpload').addEventListener('change', preventDefaults, false);
        rootEle.querySelector('.button_fileUpload').addEventListener('change', handleDrop, false);

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        function handleDrop(e) {
            let files;
            if(e.type == 'change') {
                files = this.files;
            } else {
                files = e.dataTransfer.files;
            }
            _class.handleUpload(files);
        }

        if(fileLength > 0) {
            $('.file_list_header').find('.button_svg_delete').on('click', function() {
                _class.newFileList = new Array();
                _class.fileList = _class.fileList.reduce((acc,cur,i) => {
                    if(cur.uploaded) {
                        cur.use_yn = 'N';
                        acc.push(cur);
                    }
                    return acc;
                }, []);
                _class.init();
            });

            $('.file_list').find('.button_svg_delete').on('click', function() {
                let liObj = $(this).closest('li.file_item');
                let file = _class.fileList.find(file => file.real_file_name == liObj.attr('real_file_name'));

                if(file.uploaded) {
                    file.use_yn = 'N';
                } else {
                    _class.newFileList = _class.newFileList.filter(file => file.real_file_name != liObj.attr('real_file_name'));
                    _class.fileList = _class.fileList.filter(file => file.real_file_name != liObj.attr('real_file_name'));
                }
                _class.init();
            });
        }
    }

    upload(callback, num = 0) {
        const _class = this;
        if(!this.uploadAuth) {
            if(callback) callback([]);
            return;
        }
        if(this.newFileList.length == 0) {
            if(callback) callback(this.fileList);
            return;
        } else {
            if(this.newFileList[num].uploaded) {
                num++;
                if(this.newFileList.length > num) {
                    this.upload(callback, num);
                } else {
                    if(callback) callback(this.fileList);
                }
            }
        }

        let formData = new FormData();
        formData.append('file', this.newFileList[num]);

        axios({
            headers: {
                "Content-Type": "multipart/form-data",
            },
            url: `/file/upload/${_class.newFileList[num].real_file_name}`,
            method: 'POST',
            timeout: 1000 * 60 * 5, // 5분
            data: formData
        }).then(
            response => {
                if(response.status == 200) {
                    let result = response.data;
                    console.log('file upload success', result.file);
                    let file = result.file;
                    $(`li.file_item[real_file_name="${_class.newFileList[num].real_file_name}"]`).find('.file_status').html(_class.getUploadStatusText(true));
                    let callbackFile = _class.fileList.find(v => v.real_file_name == _class.newFileList[num].real_file_name);
                    _class.newFileList[num].uploaded = true;
                    callbackFile.uploaded = false;
                    callbackFile.file_path = file.path.replace(/\\/gi, '/');
                    
                    num++;
                    if(_class.newFileList.length > num) {
                        _class.upload(callback, num);
                    } else {
                        if(callback) callback(_class.fileList);
                    }
                }
            },
        ).catch(
            error => {
                alert('파일 업로드 오류');
                console.log('file upload error', error);
                _class.newFileList[num].uploaded = false;
                $(`li.file_item[real_file_name="${_class.newFileList[num].real_file_name}"]`).find('.file_status').html(_class.getUploadStatusText(false, error));
                if($('.loading-layer').length > 0) {
                    $('.loading-layer').hide();
                }
            }
        );
    }

    convertFileJson(file) {
        let fileData = {
            real_file_name : file.real_file_name,
            file_name : file.name,
            size : file.size,
            reg_at : '-',
            uploaded : false,
            use_yn : 'Y',
        };

        return fileData;
    }

    getUploadStatusText(uploaded, error) {
        let html = '';
        if(error) {
            html += `<div class='erroruploaded'></div>`
        } else if(uploaded) {
            html += `<div class='uploaded'></div>`
        } else {
            html += `<div class='notuploaded'></div>`
        }
        return html;
    }

    getFileExtensionImg(file_name) {
        let file_extension = this.getFileExtension(file_name);
        let returnValue = '';
        switch(file_extension) {
            case 'doc' : case 'docx' : returnValue = 'docs'; break;
            case 'pdf' : returnValue = 'pdf'; break;
            case 'xlsx' : case 'xls' : returnValue = 'excel'; break;
            case 'html' : returnValue = 'html'; break;
            case 'hwp' : returnValue = 'hwp'; break;
            case 'ppt' : case 'pps' : case 'pptx' : returnValue = 'ppt'; break;
            case 'zip' : case 'rar' : case 'ace' : case 'alz' : case 'egg' : case 'gz' : case 'tgz' : returnValue = 'zip'; break;
            default : returnValue = 'etc';
        }
        return returnValue;
    }

    getFileExtension(file_name) {
        let file_extension = '';
        if(file_name && file_name.split('.').length > 1) {
            file_extension = file_name.split('.')[file_name.split('.').length-1];
        }
        return file_extension;
    }

    getFormatBytes(bytes, decimals = 2) {
        bytes = parseInt(bytes);
        if (!+bytes) return '0 Bytes'

        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }

    getDateArr() {
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
    }

    getRealFileName(file) {
        let dateArr = this.getDateArr();
        let real_file_name = Math.floor(Math.random() * 100000);
        real_file_name += dateArr.join('') + '.' + file.name.split('.')[file.name.split('.').length-1];
        return real_file_name;
    }

    handleUpload(files) {
        let uploadContinue = true;

        let totalFileSize = this.fileList.filter(v => v.use_yn == 'Y').reduce((acc,cur,i) => {
            acc += parseInt(cur.size);
            return acc;
        },0);

        for(let i = 0; i < files.length; i++) {
            let file = files[i];
            let file_extension = this.getFileExtension(file.name);
            if(
                (this.allowExtension.length > 0 && this.allowExtension.indexOf(file_extension) == -1)
                || (this.denyExtension.indexOf(file_extension) > -1)
            ) {
                alert(`${file_extension} 확장자는 허용된 파일 확장자가 아닙니다.`);
                uploadContinue = false;
                break;
            }

            if(this.maxSize && file.size > this.maxSize) {
                alert(`파일 한개 업로드 최대용량(${this.getFormatBytes(this.maxSize)})을 초과하였습니다.`);
                uploadContinue = false;
                break;
            }
            
            totalFileSize += file.size;
            file.real_file_name = this.getRealFileName(file);
        }

        if(uploadContinue && totalFileSize > this.totalMaxSize) {
            alert(`전체 파일 업로드 최대용량(${this.getFormatBytes(this.totalMaxSize)})을 초과하였습니다.`);
            uploadContinue = false;
        }

        if(uploadContinue) {
            this.newFileList = [...this.newFileList, ...files];
            for(let i = 0; i < files.length; i++) {
                this.fileList.push(this.convertFileJson(files[i]));
            }

            if(this.fileList.length > 0) {
                this.init();
            }
        }
    }
}