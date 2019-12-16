$(document).ready(function(){
    $('#searchbox').selectize({
        maxOptions: 10,
        valueField: 'url',
        searchField: ['name'],
        labelField: 'name',
        options: [],
        create: false,
        render: {
            option: function(item, escape) {
                return '<div><img src="'+ item.icon +'">' +escape(item.name)+'</div>';
                // console.log(item.name);
            }
        },
        optgroups: [
            {value: 'product', label: 'Products'},
            {value: 'category', label: 'Categories'}
        ],
        optgroupField: 'class',
        optgroupOrder: ['product','category'],
        load: function(query, callback) {
            if (!query.length) return callback();
            $.ajax({
                url: root+'/api/search',
                type: 'GET',
                dataType: 'json',
                data: {
                    q: query
                },
                error: function() {
                    callback();
                },
                success: function(res) {
                    callback(res.data);
                }
            });
        },
        onChange: function(){
            window.location = this.items[0];
        }
    });
});