import test from 'ava';
import nock from 'nock';
import { tmpdir } from 'os';
import { join } from 'path';
import { Unleash } from '../lib/unleash';

test.cb('should emit network errors', (t) => {
  nock.disableNetConnect();
  t.plan(3);
  const backupPath = join(tmpdir(), `test-tmp-${Math.round(Math.random() * 100000)}`);
  const unleash = new Unleash({
    appName: 'network',
    url: 'http://blocked.app',
    timeout: 1,
    refreshInterval: 20000,
    metricsInterval: 20000,
    disableMetrics: false,
    backupPath,
  });

  unleash.on('warn', (e) => {
    t.truthy(e);
  });

  unleash.on('error', () => {
    // silence
  });

  unleash.isEnabled('some-toggle');
  unleash.metrics.sendMetrics();

  setTimeout(() => {
    unleash.destroy();
    process.nextTick(() => {
      nock.enableNetConnect();
      t.end();
    });
  }, 1000);
});
