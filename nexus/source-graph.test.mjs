// SPDX-License-Identifier: MIT
import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {assertRuntimeGitlink} from './source-graph.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
test('declared runtime pin equals the actual Wine index gitlink',()=>{
 const lock=JSON.parse(fs.readFileSync(new URL('./source.lock.json',import.meta.url)));
 const actual=execFileSync('git',['ls-files','--stage','--','dlls/xgameruntime'],{cwd:root,encoding:'utf8'}).trim();
 assertRuntimeGitlink(actual,lock.xgameruntime);
 const wrong=lock.xgameruntime==='0'.repeat(40)?'1'.repeat(40):'0'.repeat(40);
 assert.throws(()=>assertRuntimeGitlink(actual,wrong));
 assert.throws(()=>assertRuntimeGitlink(actual.replace('160000','100644'),lock.xgameruntime));
 assert.throws(()=>assertRuntimeGitlink(actual+'\n'+actual,lock.xgameruntime));
});

test('Wayland Autoconf tests actual header paths without punctuation',()=>{
 const source=fs.readFileSync(new URL('../configure.ac',import.meta.url),'utf8');
 const block=source.match(/WINE_PACKAGE_FLAGS\(XKBCOMMON,[\s\S]*?AC_CHECK_HEADERS\(\[([^\]]+)\]/);
 assert.ok(block);const headers=block[1].trim().split(/\s+/);
 assert.deepEqual(headers,['xkbcommon/xkbcommon.h','xkbcommon/xkbcommon-compose.h']);
});
