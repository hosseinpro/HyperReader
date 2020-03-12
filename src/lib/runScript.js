import HttpClient from './HttpClient';

export default async function runScript(
  script,
  requestid = null,
  userid = null,
) {
  const AsyncFunction = new Function(
    `return Object.getPrototypeOf(async function(){}).constructor`,
  )();
  const scriptRunner = new AsyncFunction(
    '_requestid',
    '_userid',
    '_sendAPDU',
    '_getHttp',
    '_pinPad',
    '_messageBox',
    script,
  );

  return await scriptRunner(
    requestid,
    userid,
    global.nfcReader.transmit,
    HttpClient.get,
    global.pinModal.show.bind(global.pinModal),
    global.messageModal.show.bind(global.messageModal),
  );
}
