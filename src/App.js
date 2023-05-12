import React, { Component } from 'react';
import axios from 'axios';

import ErrorsList from './components/ErrorsList/ErrorsList';
import ModeledOutput from './components/ModeledOutput/ModeledOutput';
import RawResults from './components/RawResults';

import './App.css';

import Config from './data/config.json';
import EXAMPLE1 from './data/example1.json';
import EXAMPLE2 from './data/example2.json';

const SWAP_IN_FAKE = true;

const Api = axios.create({
  baseURL: Config.baseUrl,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": `Key ${Config.apiKey}`,
  }
});

class App extends Component {

  state = {
    document: '',
    textActive: true,
    confirming: false,
    processing: false,
    processed: false,
    results: null,
    error: null
  }

  doValidate = (e) => {
    e.preventDefault();
    this.setState({ textActive: false });
    if (this.state.document.length < 1) {
      alert("Nothing to send");
      this.setState({ textActive: true });
    } else {
      this.setState({ confirming: true });
    }
  }

  doFakeProcess = (beSuccess) => {
    window.setTimeout(() => {
      if (beSuccess) {
        this.markValid(EXAMPLE1);
      } else {
        this.markInvalid(EXAMPLE2);
      }
    }, 300);
  }

  parseError = (error) => {
    if (!error.isAxiosError) {
      return {
        code: 'UNKNOWN',
        message: 'Unknown error',
        context: { baseError: error }
      };
    } else {
      const info = error.toJSON();
      let context = {
          message: info.message,
          request_url: info.config.baseURL,
          request_data: info.config.data
      };
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        context.status = error.response.status;
        return {
          code: error.response.data.code,
          message: error.response.data.msg,
          context: context,
          data: error.response.data
        };
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        return {
          code: 'NETWORK_FAILURE',
          message: context.message,
          context: context,
          full: info
        };
      } else {
        // Something happened in setting up the request that triggered an Error
        return {
          code: 'UNKNOWN',
          message: error.message,
          context: context
        };
      }
    }
  }

  markValid = (res) => {
    this.setState({ results: res, error: null, textActive: true, processing: false, processed: true });
  };

  markInvalid = (err) => {
    this.setState({ results: null, error: err, textActive: true, processing: false, processed: true });
  };

  doRealProcess = () => {
    Api.post('/x12/to-json', {
        input: this.state.document
      })
      .then(res => {
        if ('data' in res && 'error' in res.data) {
          this.markInvalid(res);
        } else {
          this.markValid(res);
        }
      })
      .catch(err => {
        const parsed = this.parseError(err);
        this.markInvalid(parsed);
      })
  }

  doConfirmYes = (e) => {
    e.preventDefault();
    this.setState({ confirming: false, processing: true, processed: false, results: null, error: null });
    if (SWAP_IN_FAKE) {
      this.doFakeProcess(true);
    } else {
      this.doRealProcess();
    }
  };

  doConfirmNo = (e) => {
    e.preventDefault();
    if (SWAP_IN_FAKE) {
      this.setState({ confirming: false, processing: true, processed: false, results: null, error: null });
      this.doFakeProcess(false);
    } else {
      this.setState({ results: null, textActive: true, confirming: false });
    }
  };

  changedText = (e) => {
    this.setState({ document: e.target.value });
  }

  render() {

    return (
      <div className="App">
        <h1>EDI Validator</h1>
        <form>
          <div className="buttonBox">
            {!this.state.confirming && !this.state.processing &&
              <button onClick={this.doValidate}>Validate</button>
            }
            {this.state.confirming && !SWAP_IN_FAKE &&
              <div className="confirm">
                <span>Are you sure? It costs money.</span>
                <button onClick={this.doConfirmYes}>Yes</button>
                <button onClick={this.doConfirmNo}>No</button>
              </div>
            }
            {this.state.confirming && SWAP_IN_FAKE &&
              <div className="confirm">
                <span>Which kind of response do you want?</span>
                <button onClick={this.doConfirmYes}>Success</button>
                <button onClick={this.doConfirmNo}>Failure</button>
              </div>
            }
            {this.state.processing &&
              <span>...processing...</span>
            }
          </div>
          <ErrorsList data={this.state.error || this.state.results} />
          <div className="wrapper">
            <div className="formSide">
              <h3>EDI doc</h3>
              <textarea
                onChange={this.changedText}
                disabled={!this.state.textActive}
                value={this.state.document}
                />
            </div>
            <div className="resultSide">
              <h3>Results</h3>
              <div className="ResultsBlock">
                {this.state.processed &&
                  <ModeledOutput
                    data={this.state.error || this.state.results}
                    className={this.state.error ? 'error' : 'success'}
                   />}
                {!this.state.processed &&
                  <div className="Waiting empty"></div>}
              </div>
            </div>
          </div>
        </form>
        <RawResults data={this.state.error || this.state.results}
          className={this.state.error ? 'error' : 'success'} />
      </div>
    );
  }
}

export default App;
