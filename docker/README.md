# 使い方

## dockerのビルド
``` bash
./build.sh [common_name]
```

## 実行方法

SSL の場合
``` bash
docker compose -f www-compose-linux-ssl.yaml up
```

通常の場合
``` bash
docker compose -f www-compose-linux.yaml up
```

### compose.yaml の パラメータ(環境変数として設定)
- WEB_HOSTNAME (default: 0.0.0.0)
- BRIDGE_MASTER (default: http://localhost:11311)
- BRIDGE_HOSTNAME (default: 0.0.0.0)
- BRIDGE_PORT (default: 9990)
- NETWORK_MODE (default: host)
- ROS_MASTER_URI [pass to rosbridge]
- ROS_HOSTNAME [pass to rosbridge]

## webサイトへの接続

### rostest

通常の場合
```
http://$$HOSTNAME$$/rostest/rostest.html?wsport=9909&wsaddr=$$HOSTNAME$$
```

SSL の場合
```
https://$$HOSTNAME$$/rostest/rostest.html?wsport=9990&wsaddr=$$HOSTNAME$$&ssl=1
```

```/webtest``` で std_msgs/String が subscribe される(subscribeした文字列がサイトに表示される)

```$$HOSTNAME$$``` には同じホスト名(グローバルアドレス)を指定する

### rostest2

通常の場合
```
http://$$HOSTNAME$$/rostest/rostest_pub.html?wsport=9909&wsaddr=$$HOSTNAME$$
```

SSL の場合
```
https://$$HOSTNAME$$/rostest/rostest_pub.html?wsport=9990&wsaddr=$$HOSTNAME$$&ssl=1
```

```/pubtest``` に std_msgs/String が publish される

### audio

SSL の場合
```
https://$$HOSTNAME$$/audio/audio_wav.html?wsport=9990&wsaddr=$$HOSTNAME$$&ssl=1
```

```/audio``` がpublishされる

../script/sub_audio.py を参照

### touch

通常の場合
```
http://$$HOSTNAME$$/touch/touch.html?wsport=9909&wsaddr=$$HOSTNAME$$
```

SSL の場合
```
https://$$HOSTNAME$$/touch/touch.html?wsport=9990&wsaddr=$$HOSTNAME$$&ssl=1
```

```/writing``` がpublishされる

../script/sub_writing.py を参照


# 以下は古い情報
# Apache と rosbridge_server を使って browser からrostopicを送る

rosbridge: https://wiki.ros.org/rosbridge_server

- apacheが必要な理由

https接続をしないと、browserでメディアが扱えないため

- ssl接続のwebsocketが必要な理由

https接続のページから平文のwebsocketに接続できないため


## SSLのローカル設定 

userdir に server.key と server.crt を作る

未確認だが、server.crt を作るとき name のみ正しい HOSTNAME を入れる必要があるかもしれない

``` bash
openssl genrsa -out server.key 2048
openssl req -out server.csr -key server.key -new
openssl x509 -req -days 3650 -signkey server.key -in server.csr -out server.crt -extfile SAN.txt
```

SAN.txt は以下のような感じ。（有効に働いているようには見えない）

``` bash
echo "subjectAltName = DNS:simserver.irsl.eiiris.tut.ac.jp, DNS:repo.irsl.eiiris.tut.ac.jp, DNS:cpshost.irsl.eiiris.tut.ac.jp" > SAN.txt
```

作成した server.key と server.crt を Apacheとrosbridgeで共有することで、sslを用いたwebsocket通信ができる。

（共有する必要があるかどうかも未確認で、関係していないかもしれない）

## 実行方法

dockerディレクトリ以下の、 ファイル内に ```$$HOSTNAME$$``` と書いてあるところを現在のPCの名前 または IP address に変更する

以下の例: simserver.irsl.eiiris.tut.ac.jp に書き換えている

``` bash
cd docker
sed -i -e 's@\$\$HOSTNAME\$\$@simserver.irsl.eiiris.tut.ac.jp@g' sites-available/* userdir/* *.yaml
```

### dockerのビルド
``` bash
docker build . -f Dockerfile.apache_rosbridge apache_rosbridge:noetic
```

### 立ち上げコマンド

SSL の場合
``` bash
docker compose -f docker-compose-linux-ssl.yaml up
```

通常の場合
``` bash
docker compose -f docker-compose-linux.yaml up
```
