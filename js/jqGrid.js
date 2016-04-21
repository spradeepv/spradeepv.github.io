function createGrid() {
	var myGrid = jQuery("#grid");
	myGrid.jqGrid({
		url : 'data/jqGrid.json',
		datatype : 'json',
		jsonReader : {
			root : "rows",
			page : "currpage",
			total : "totalpages",
			records : "totalrecords",
			cell : "",
			id : "0"
		},
		mtype : 'GET',
		colNames : [ 'Name', 'Age', 'Sex', 'Designation'],
		colModel : [ {
			name : 'name',
			index : 'name',
			align : 'left',
			sortable : true,
			sorttype:"text"
		}, {
			name : 'age',
			index : 'age',
			align : 'center',
			sortable : true,
			sorttype:"int"
		}, {
			name : 'sex',
			index : 'sex',
			align : 'center',
			sortable : true,
			sorttype:"text"
		}, {
			name : 'designation',
			index : 'designation',
			align : 'center',
			sortable : true,
			sorttype:"text"
		}],
		pager : '#gridPager',
		rowNum : 20,
		rowList : [ 20, 30, 50 ],
		sortname : 'name',
		sortorder : 'asc',
		viewrecords : true,
		gridview : true,
		hidegrid : false,
		caption : 'Employee Details',
		autowidth : true,
		loadonce: true,
		shrinkToFit : true,
		height : '100%',
		pginput : false,
		loadComplete: function () {
	        jQuery("#grid").jqGrid('setGridParam', { datatype: 'local' });
	    },
	});
	jQuery("#grid").jqGrid('navGrid', '#gridPager', {
		add : false,
		edit : false,
		del : false,
		search : true,
		refresh: true
	});

	jQuery("#grid").jqGrid(
			'navButtonAdd',
			'#gridPager',
			{
				caption : "CSV",
				onClickButton : function() {
					alert("Call your own method to create a csv file");
				}
			});
	jQuery("#grid").jqGrid(
			'navButtonAdd',
			'#gridPager',
			{
				caption : "PDF",
				onClickButton : function() {
					alert("Call your own method to create a pdf file");
				}
			});
	jQuery("#grid").jqGrid(
			'navButtonAdd',
			'#gridPager',
			{
				caption : "XLS",
				onClickButton : function() {
					alert("Call your own method to create a xls file");
				}
			});
}