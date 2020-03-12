import React, {Component} from 'react';
import runScript from '../lib/runScript';

export default class RemoteRun extends Component {
  async run(requestid, userid, text, script) {
    const result = await global.tapCardModal.show(text);
    if (result === 'cancel') return;

    global.waitModal.show();
    try {
      await runScript(script, requestid, userid);
    } catch (error) {
      console.error(error);
    }

    global.waitModal.hide();
  }
  render() {
    return <></>;
  }
}
