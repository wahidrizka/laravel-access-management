<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->get();

        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        $roles = Role::pluck('name', 'name')->all();

        return Inertia::render('Users/Create', [
            'roles' => $roles,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'roles' => ['required', 'array'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->syncRoles($request->roles);

        return Redirect::route('users.index');
    }

    public function edit(User $user)
    {
        $roles = Role::get();

        $userHasRoles = DB::table('model_has_roles as mhr')
            ->join("roles as r", "r.id", "=", "mhr.role_id")
            ->where("mhr.model_id", $user->id)
            ->select("mhr.role_id", "mhr.model_id", "r.name")
            ->get();

        return Inertia::render('Users/Edit', [
            'user' => $user,
            'roles' => $roles,
            'userHasRoles' => $userHasRoles,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => ['required', 'string'],
            'email' => ['required', 'email', 'unique:users,email,' . $user->id],
            'roles' => ['required', 'array'],
        ]);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
        ];

        if (!empty($request->password) || $request->password != "") {
            $data += [
                'password' => Hash::make($request->password),
            ];
        }

        $user->update($data);
        $user->syncRoles($request->roles);

        return Redirect::back();
    }
}
