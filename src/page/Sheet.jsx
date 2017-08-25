import React, { PureComponent } from 'react';
import XLSX from 'xlsx';


class Sheet extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            wb: null
        };
        this.reader = new FileReader();
    }
    componentDidMount() {
        this.reader.onload = (e) => {
            const data = e.target.result;
            const wb = XLSX.read(data, { type: 'binary' });
            this.setState({ wb });
        };
    }

    submit = () => {
        const file = this.refs.file;
        if (!file.files) {
            return;
        }
        const f = file.files[0];
        this.reader.readAsBinaryString(f);
    }    

    /**
     * 将后台返回的HTML字符串渲染为html结构
     */
    createMarkup = html => ({
        __html: html   
    })

    render() {
        if (this.state.wb) {
            const ws = this.state.wb.Sheets[this.state.wb.SheetNames[0]];
            console.log(this.state.wb, ws);
        }
        return (
            <div>
                <input type="file" name="file" ref="file" />
                <button onClick={this.submit}>提交</button>
                {
                    this.state.wb ?
                        <div 
                            dangerouslySetInnerHTML={
                                this.createMarkup(XLSX.utils.sheet_to_html(this.state.wb.Sheets[this.state.wb.SheetNames[0]]))
                            } 
                        />
                        : 
                        null
                }
            </div>
        );
    }
}
export default Sheet;