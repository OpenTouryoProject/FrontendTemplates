import 'importer.dart';

// プッシュ通知
import 'package:firebase_messaging/firebase_messaging.dart';

// ...
import 'package:flutter_template/models/message_arguments.dart';

/// Displays information about a [RemoteMessage].
class MessageView extends StatelessWidget {
  /// A single data row.
  Widget _row(String? title, String? value) {
    return Padding(
      padding: const EdgeInsets.only(left: 8, right: 8, top: 8),
      child: Row(children: [
        Text('$title: '),
        Text(value ?? 'N/A'),
      ]),
    );
  }

  @override
  Widget build(BuildContext context) {
    MessageArguments? args =
      ModalRoute.of(context)?.settings.arguments as MessageArguments;

    RemoteMessage? message = args.message;
    RemoteNotification? notification = message.notification;

    return Scaffold(
      appBar: AppBar(
        title: Text(message.messageId ?? ""),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(8),
          child: Column(children: [
            this._row('Triggered application open', args.openedApplication.toString()),
            this._row('Message ID', message.messageId ?? ""),
            this._row('Sender ID', message.senderId ?? ""),
            this._row('Category', message.category ?? ""),
            this._row('Collapse Key', message.collapseKey ?? ""),
            this._row('Content Available', message.contentAvailable.toString()),
            this._row('Data', message.data.toString()),
            this._row('From', message.from ?? ""),
            this._row('Message ID', message.messageId ?? ""),
            this._row('Sent Time', message.sentTime?.toString() ?? ""),
            this._row('Thread ID', message.threadId ?? ""),
            this._row('Time to Live (TTL)', message.ttl?.toString() ?? ""),
            if (notification != null) ...[
              Padding(
                padding: const EdgeInsets.only(top: 16),
                child: Column(children: [
                  const Text(
                    'Remote Notification',
                    style: TextStyle(fontSize: 18),
                  ),
                  this._row(
                    'Title',
                    notification.title ?? "",
                  ),
                  this._row(
                    'Body',
                    notification.body ?? "",
                  ),
                  if (notification.android != null) ...[
                    const Text(
                      'Android Properties',
                      style: TextStyle(fontSize: 18),
                    ),
                    this._row(
                      'Channel ID',
                      notification.android?.channelId ?? "",
                    ),
                    this._row(
                      'Click Action',
                      notification.android?.clickAction ?? "",
                    ),
                    this._row(
                      'Color',
                      notification.android?.color ?? "",
                    ),
                    this._row(
                      'Count',
                      notification.android?.count?.toString() ?? "",
                    ),
                    this._row(
                      'Image URL',
                      notification.android?.imageUrl ?? "",
                    ),
                    this._row(
                      'Link',
                      notification.android?.link ?? "",
                    ),
                    this._row(
                      'Priority',
                      notification.android?.priority.toString() ?? "",
                    ),
                    this._row(
                      'Small Icon',
                      notification.android?.smallIcon ?? "",
                    ),
                    this._row(
                      'Sound',
                      notification.android?.sound ?? "",
                    ),
                    this._row(
                      'Ticker',
                      notification.android?.ticker ?? "",
                    ),
                    this._row(
                      'Visibility',
                      notification.android?.visibility.toString() ?? "",
                    ),
                  ],
                  if (notification.apple != null) ...[
                    const Text(
                      'Apple Properties',
                      style: TextStyle(fontSize: 18),
                    ),
                    this._row(
                      'Subtitle',
                      notification.apple?.subtitle ?? "",
                    ),
                    this._row(
                      'Badge',
                      notification.apple?.badge ?? "",
                    ),
                    this._row(
                      'Sound',
                      notification.apple?.sound?.name ?? "",
                    ),
                  ]
                ]),
              )
            ]
          ]),
        )
      ),
    );
  }
}