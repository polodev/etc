#DevDojo laravel 5.3 gist (From Favorite Tony)     
### Installation     
homestate or valet    
get composer command & getting started globally > for command line    
install laravel command line      
~~~~
laravel new <appName>
php artisan serve
~~~~

### Folder structure
app> model & controller    
bootstrap > laravel bootstrap    
config > configuration for different packages and laravel setting    
database > all of our migration and seed     
public > all of our asset and publicly available file's are going to live   
resources > views, html & css that the user going to see    
routes >  where our routes going to live    
storage > all of our logs and other kind of storage for our application   
tests > all of our unit test we want to run to check our application working correctly    
vendor > all of our third party vendor library going to live     

3.Routing
post > create and item     
	token misMatch exception csrf 
~~~~~
	 type="hidden" value=csrf_token() name ="_token"
~~~~~
get > read an item   
put > update a item    
~~~~
	type="hidded" name="_method" value="PUT"
~~~~   
delete > delete a item     
~~~~   
	type="hidden" name="_method" value="DELETE"
~~~~   
all code    
~~~~
Route::get('/', function () {
	echo "hello laravel";
});
Route::get('/hello/{name}', function () {
	echo "Hello again" . $name;
});
Route::post('/hello', function ) { //put, delete
	echo '<input type="hidden" name="_token" value=". csrf_token() ." id="">';
	echo '<input type="hidden" name="_method" value="PUT" id="">';
	echo '<input type="hidden" name="_method" value="DELETE" id="">';
}
~~~~

###Artisan   
~~~~   
php artisan server
return view('welcome')
php artisan make:model Customer
php artisan make:controller CustomerController
Route::get('home', function () {
	return view('welcome') //welcome file name 
})
~~~~   

###Model    
Model is a way of tie database table to a  file. We can simply reference database table by calling model class   
explicitly table name inside Customers.php model `protected $table = 'customer'  `
to change database credential `__ROOT__ > .env ` file    
demonstrate `find, first, where`     
~~~~   
Route::get('customer/{id}', function () {
	$customer = App\Customer::first();
	$customer = App\Customer::find($id);
	echo $customer->name
});

Route::get('customer_name', function () {
	$customer = App\Customer::where('name', '=', 'Tony')->first()
	echo $customer->id;
})
~~~~   


###RelationShip    
Easy way to relate one table to another       
~~~~   
Route::get('/orders', function () {
	$order = App\Order::all();
	foreach($orders as $order) {
		$customer  = App\Customer::find($order->customer_id);
		echo $order->name . ' belongs to ' . $customer->name;
	}
})
//Model //Order.php
public function Customer() {
	return $this.belongsTo('App\Customer');
}
//Model //Customer
public function orders () {
	return $this->hasMany('App\Order');
}
//after relationship
Route::get('/orders', function () {
	$order = App\Order::all();
	foreach($orders as $order) {
		echo $order->name . ' belongs to ' . $order->customer->name;
	}
});

Route::get('customer/{id}', function () {
	$customer = App\Customer::first();
	$customer = App\Customer::find($id);
	foreach ($customer->orders as $order) {
		echo $order->name;
	}
	echo $customer->name;
});
~~~~   
#### Views
Views output data to the screen    
~~~~   
Rotue::get('/mypage', function () {
	$data = array(
			'var1' => 'Hamburger',
			'var2' => 'HotDog',
			'var3' => 'French Fries'
		)
	return view('mypage', $data);
})
//in mypage
$var1 = 'Hamburger'
~~~~   

#### Blade Template  
Blade template allow us to  use new syntax inside view instead of php    
`mypage.php >> mypage.blade.php ` to use blade syntax    
`{{ $var1 }} `  for echo variable    
@if @endif,

@foreach  ($orders as $order)
	{{ $order->name }}
@endforeach    

### Controllers    
Controller are the main logic of application is going to live    
~~~~
Php artisan make:controller CustomerController
Route::get('/customer', 'CustomerController@customer');
~~~~    
Since we dont in `App\Http\Controllers` namespace so we have use Model namespace `use App\Customer`    
~~~~    
public function customer($id) {
	$customer = Customer::find($id);
	return view('welcome', array('customer' => $customer));
	or
	return view('welcome', compact('customer'));
}
~~~~
###Authentication    
~~~~
laravel new myFirstAuth    
php artisan make:auth
php artisan mgrate
~~~~

### Middleware   
Middleware allow us to run code before our application receive request    
~~~~
public function __construct () {
	$this->middleware('auth');
}
//Kernel.php registered all middleware    
php artisan make:middleware AdminMiddleware    
//copy everything from RedirectIfAuthenticated.php to  AdminMiddleware.php and rename className
Route::get('/admin', function () {
	echo 'You have access';
})
//AdminMiddleware.php 
if('some condition' && Auth::user()->admin == 1) {
	return $next($request);
}else {
	return redirect('/');
}
//Kernel.php add the following line
'admin' => \App\Http\Middleware\AdminMiddleware::class  //now we can use admin middleware shorthand we can use in route file
Route::get('/admin', function () {
	echo 'You have access';
})->middleware('admin');

//for multiple route
Route::group(['middleware' => 'admin'], function () {
	Route::get('/admin', function () {
		echo 'You have access';
	})
})
~~~~

#### Migration   
Migration is way of storing database schema in files instead of just in your database. So if you sharing project with someone they can easily have your schema. If you  working in a project with team they can just run the latest migration and have this same database schema you are currently working with.  
~~~~
php artisan make:migration create_customers_table    

public function up() {
	Schema::create('customers', function (Blueprint $table) {
		$table->increments('id');
		$table->string('name');
	})
}
public function down() {
	Schema::drop('customers');
}


php artisan migrate    
php artisan migrate:rollback    

~~~~
