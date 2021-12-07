import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class PatientDiagnosis extends Component {
    state = { diagnosis: [], editorState: EditorState.createEmpty() }


    handlePrescribeDrug = () => {
        this.props.history.push('/selectdrug', {stuff:this.props.location.state.stuff, patient: this.props.location.state.patient, diagnosis: this.state.diagnosis });
    }

    getRawDiagnosis(editor) {
        var dia = [];
        const res = convertToRaw(editor.getCurrentContent());
        res.blocks.map(block => {
            const b = block.text;
            dia = [...dia, b];        
        });
        this.setState({diagnosis: dia});
    }

    onEditorStateChange = (editorState) =>{
        this.setState({ editorState });
        this.getRawDiagnosis(editorState);
    } 
    
    render() {
        const { firstName, lastName } = this.props.location.state.patient;
        const { editorState } = this.state;
        return (
            <React.Fragment>
                <h2 style={{ textAlign: 'center' }}>
                    Diagnosis of {firstName}  {lastName}
                </h2>
                <div className="container clearfix" style={{ border: 1 + 'px solid #e9e9e9', padding: 30 + 'px', marginTop: 20 + 'px' }}  >
                    <form>
                        <div className="row">
                            <div className="col-2">
                                <label>First Name: </label>  {firstName}
                                <label>Last Name: </label>  {lastName}
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: '40px' }}>
                            <div style={{border:'1px solid #e9e9e9', minHeight: '300px'}}>
                                <Editor
                                    placeholder="Diagnosis goes here..."
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={this.onEditorStateChange}
                                />
                            </div>
                        </div>
                            <div className="float-right" style={{marginTop: '10px'}}>
                                <button className="btn btn-outline-primary btn-sm" 
                                type="button" onClick={this.handlePrescribeDrug}>Prescribe Drugs</button>
                            </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default PatientDiagnosis;