$(document).ready(function() {
    // 創建下拉表單元素
    var selectElement = $('<select id="category">');
    selectElement.append('<option value="all">全部</option>');
    selectElement.append('<option value="4">食品</option>');
    selectElement.append('<option value="3">運動</option>');
    selectElement.append('<option value="5">3C產品</option>');

    // 創建按鈕元素
    var buttonElement = $('<button>').text('確定');
    buttonElement.click(showSelectedFruit);

    // 創建表格元素
    var tableElement = $('<table id="posts-table">');
    tableElement.append('<td>產品1</td><td>產品2</td><td>產品3</td><td>產品4</td><td>產品5</td>');

    // 將下拉表單和按鈕添加到HTML中
    $('#container').append(selectElement);
    $('#container').append(buttonElement);
    $('#container').append(tableElement);

    // 發送 AJAX 請求獲取文章數據
    function showSelectedFruit() {
        var selectedCategory = $('#category').val();
        var url = 'https://oliverwork.000webhostapp.com/wp-json/wp/v2/posts';

        if (selectedCategory !== 'all') {
            url += '?categories=' + selectedCategory;
        }

        $.ajax({
            url: url,
            method: 'GET',
            success: function(response) {
                // 清空表格內容
                tableElement.empty();

                // 將返回的文章數據按時間排序
                response.sort(function(a, b) {
                    var dateA = new Date(a.date).getTime();
                    var dateB = new Date(b.date).getTime();
                    return dateB - dateA;
                });

                var count = 0

                // 遍歷文章數據並在表格中顯示標題、特色圖片和金額
                $.each(response, function(index, post) {
                    console.log(response)
                    var title = post.title.rendered;
                    var featuredMediaId = post.featured_media;
                    var money = post.x_metadata.amount;
                    var postId = post.id;

                    // 發送 AJAX 請求獲取特色圖片的URL
                    $.ajax({
                        url: 'https://oliverwork.000webhostapp.com/wp-json/wp/v2/media/' + featuredMediaId,
                        method: 'GET',
                        success: function(mediaResponse) {
                            var featuredImageUrl = mediaResponse.source_url;

                            // 創建表格的行並將標題、特色圖片和金額插入
                            var row = $('<table>');
                            var imageCell = $('<thead>').html('<a href="post.html?id=' + postId + '"><img src="' + featuredImageUrl + '"></a>');
                            var titleCell = $('<tbody>').text(title);                            
                            var moneyCell = $('<tfoot>').text('價格:' + money);

                            row.append(titleCell, imageCell, moneyCell);

                            // 將整個行插入表格中
                            tableElement.append('<td>');
                            tableElement.append(row);
                            tableElement.append('</td>');
                            count = count+1
                            if(count%4 == 0){
                                tableElement.append('<tr>');
                            }
                        },
                        error: function(xhr, status, error) {
                            console.log('獲取特色圖片URL失敗：' + error);
                        }
                    });

                });
            },
            error: function(xhr, status, error) {
                console.log('請求失敗：' + error);
            }
        });
    }

    // 頁面加載時顯示全部文章
    showSelectedFruit();
});