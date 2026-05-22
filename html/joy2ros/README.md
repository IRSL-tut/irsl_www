# joy2ros
ブラウザを表示しているコンピュータにjoypadを接続すると，ROS Topicとして送信できる．

## 接続URL例
- `https://$$HOSTNAME$$/joy2ros/main.html?wsport=9990&wsaddr=$$HOSTNAME$$&ssl=1&topic=/joy`
    - `$$HOSTNAME$$`にはサーバIPを記載する
- URLパラメタ
    - wsport : Websocket port番号（基本9990）
    - wsaddr : Websocket アドレス
    - ssl : SSL使用の有無（必ず1）
    - topic : publishするtopic名（記載なければ`/joy`）
- ページに`Edge Trigger`と`Periodic`の選択項目があるので必要に応じて変更する．
