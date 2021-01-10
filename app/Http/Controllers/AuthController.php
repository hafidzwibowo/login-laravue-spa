<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credential = $request->only('email', 'password');

        if ( Auth::attempt($credential, $request->remember) ) {
            $request->session()->regenerate();
            return response()->json(['status' => true, 'result' => Auth::user()]);
        } else {
            return response()->json(['status' => false, 'reason' => 'Login failed']);
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();

    }

    public function isLogin()
    {
        return response()->json(['status' => Auth::check()]);
    }
}
