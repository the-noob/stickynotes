/* global confirm: false */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isJSON } from '../utils/file';

class OptionsUI extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => this.filePicker.click()}>import</button>
        <button onClick={this.props.export}>export</button>
        <input
          ref={(input) => { this.filePicker = input; }}
          type="file"
          style={{ position: 'fixed', top: 10, display: 'none' }}
          onChange={e => this.props.handleInputFiles(e.target.files)}
        />
      </div>
    );
  }
}

OptionsUI.propTypes = {
  export:           PropTypes.func.isRequired,
  handleInputFiles: PropTypes.func.isRequired,
};

OptionsUI.defaultProps =  {
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    export:           () => dispatch({ type: 'EXPORT', payload: [] }),
    handleInputFiles: (files) => {
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        if (isJSON(file)) {
          const reader = new FileReader();
          reader.onload = () => {
            try {
              const data = JSON.parse(reader.result);
              dispatch({ type: 'IMPORT', payload: data });
            } catch (e) {
              dispatch({ type: 'IMPORT_FAIL', payload: e });
            }
          };
          reader.readAsText(file);
        }
      }
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionsUI);