package com.example.android_client.activities.home;

import android.os.Bundle;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.android_client.R;

import com.example.android_client.databinding.FragmentCreateCategoryBinding;
import com.example.android_client.models.Category;
import com.example.android_client.viewmodels.CategoryViewModel;


public class CreateCategoryFragment extends Fragment {
    private FragmentCreateCategoryBinding binding;
    private CategoryViewModel categoryViewModel;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        binding = FragmentCreateCategoryBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        categoryViewModel = new ViewModelProvider(this).get(CategoryViewModel.class);

        categoryViewModel.getCategoryData().observe(getViewLifecycleOwner(), category -> {
            if (category != null) {
                binding.name.setText("");
                binding.promoted.setChecked(false);
                Toast.makeText(getContext(), category.getMessage(), Toast.LENGTH_LONG).show();
            }
        });

        binding.createButton.setOnClickListener(v -> {
            this.createCategory();
        });

        return root;
    }

    private void createCategory() {
        String name = binding.name.getText().toString();
        if (name.isEmpty()) {
            binding.name.setError(getString(R.string.required));
            return;
        }
        boolean promoted = binding.promoted.isChecked();
        categoryViewModel.createCategory(new Category(name, promoted));
    }


}