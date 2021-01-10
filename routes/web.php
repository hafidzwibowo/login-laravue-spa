<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::post('login', [AuthController::class, 'login'])->name('login');
Route::post('logout', [AuthController::class, 'logout'])->name('logout');

Route::get('login', function() {
    if (Auth::check()) return redirect('/dashboard');
    return view('landing');
});

Route::group(['middleware' => 'auth', 'prefix' => 'dashboard'], function() {
    Route::any('/', function() {
        return view('landing');
    });
});

Route::get('{any}', function() {
    return view('landing');
})->where('any', '.*');
