import '../importer.dart';

// --- モデル ---
class WeatherForecast {
  final String dateFormatted;
  final int temperatureC;
  final int temperatureF;
  final String summary;

  const WeatherForecast({
    required this.dateFormatted,
    required this.temperatureC,
    required this.temperatureF,
    required this.summary,
  });

  factory WeatherForecast.fromJson(Map<String, dynamic> json) {
    return WeatherForecast(
      dateFormatted: json['dateFormatted'] as String,
      temperatureC: json['temperatureC'] as int,
      temperatureF: json['temperatureF'] as int,
      summary: json['summary'] as String,
    );
  }
}

// --- 定数 (constants.dart の FetchDataRootUrl に相当) ---
// 実際の URL に合わせて変更してください。
final String _fetchDataRootUrl = AppConfig.fetchDataRootUrl;

// --- Screen ---
class ScreenFetchData extends StatefulWidget {
  const ScreenFetchData({super.key});

  @override
  State<ScreenFetchData> createState() => _ScreenFetchDataState();
}

class _ScreenFetchDataState extends State<ScreenFetchData> {
  List<WeatherForecast> _forecasts = [];
  bool _loading = true;
  int _currentPage = 1;
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
    _fetchForecasts(1);
  }

Future<void> _fetchForecasts(int page) async {
  setState(() {
    _loading = true;
    _errorMessage = null;
  });

  await getFetch(
    '${_fetchDataRootUrl}startDateIndex=$page',
    {'Content-Type': 'application/json'},
    (data) {
      final jsonList = data as List<dynamic>;
      final forecasts = jsonList
          .map((e) => WeatherForecast.fromJson(e as Map<String, dynamic>))
          .toList();
      setState(() {
        _forecasts = forecasts;
        _currentPage = page;
        _loading = false;
      });
    },
    (msg) {
      setState(() {
        _errorMessage = msg;
      });
    },
  );
}

  void _handlePrev() {
    if (_currentPage > 1) {
      _fetchForecasts(_currentPage - 1);
    }
  }

  void _handleNext() {
    _fetchForecasts(_currentPage + 1);
  }

  // --- テーブル描画 ---
  Widget _buildForecastTable() {
    const headerStyle = TextStyle(fontWeight: FontWeight.bold);

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: DataTable(
        columns: const [
          DataColumn(label: Text('Date', style: headerStyle)),
          DataColumn(label: Text('Temp. (C)', style: headerStyle)),
          DataColumn(label: Text('Temp. (F)', style: headerStyle)),
          DataColumn(label: Text('Summary', style: headerStyle)),
        ],
        rows: _forecasts
            .map(
              (f) => DataRow(cells: [
                DataCell(Text(f.dateFormatted)),
                DataCell(Text('${f.temperatureC}')),
                DataCell(Text('${f.temperatureF}')),
                DataCell(Text(f.summary)),
              ]),
            )
            .toList(),
      ),
    );
  }

  // --- ページネーション ---
  Widget _buildPagination() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        ElevatedButton(
          onPressed: (_loading || _currentPage <= 1) ? null : _handlePrev,
          child: const Text('« Prev'),
        ),
        const SizedBox(width: 12),
        Text('Page $_currentPage'),
        const SizedBox(width: 12),
        ElevatedButton(
          onPressed: _loading ? null : _handleNext,
          child: const Text('Next »'),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Weather forecast',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          const Text('This component demonstrates fetching data from the server.'),
          const SizedBox(height: 16),

          // コンテンツ
          Expanded(
            child: Center(
              child: _loading
                  ? const CircularProgressIndicator()
                  : _errorMessage != null
                      ? Text(
                          'Error: $_errorMessage',
                          style: const TextStyle(color: Colors.red),
                        )
                      : _buildForecastTable(),
            ),
          ),

          const SizedBox(height: 12),
          _buildPagination(),
        ],
      ),
    );
  }
}