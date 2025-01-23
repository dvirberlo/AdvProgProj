package com.example.android_client.activities.home;

import android.os.Bundle;
import androidx.fragment.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import com.example.android_client.R;

import com.example.android_client.databinding.FragmentCreateCategoryBinding;


public class CreateCategoryFragment extends Fragment {
    private FragmentCreateCategoryBinding binding;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        binding = FragmentCreateCategoryBinding.inflate(inflater, container, false);
        View root = binding.getRoot();
        return root;
    }
}