# Hackolade CLI Steps - Walkthrough

Here are some notes as to what happened during the hackolade cli input/output process. The Steps are separated by the use of `jsonschemacompliance`, between `full` and `extended`.

> [!NOTE]
> All operations are run from within the root folder.

### Step 0: create hackolade db

Refer to `hackolade_experiment.hck.json`

## With 'full' as the json schema compliance

> [!NOTE]
> Files are located inside of the `full` folder.

### Step 1: export to json

```
hackolade forweng \
    --outputtype jsonschema \
    --format js \
    --jsonschemacompliance full \
    --skipUndefinedLevel true \
    --structuredpath false \
    --path full/1_hack-to-json/ \
    --model hackolade_experiment.hck.json \
    --enable-logging
```

**Result**: Refer to content in `full/1_hack_to_json`


### Step 2: Merge back to hackolade

> [!NOTE]
> Before this step, a copy of the original source hackolade file was placed in the `full/2_json-to-hack` folder.

```
hackolade revengjson \
    --model full/2_json-to-hack/hackolade_experiment.hck.json \
    --target MONGODB \
    --targetVersion "v7.x" \
    --files "full/1_hack-to-json/hackolade_experiment/experimental_database/\*.json" \
    --container experimental_database \
    --conflictresolution merge \
    --maxerdentityboxes true \
    --enable-logging
```

**Result**: `hackolade_experiment.hck.json` in `full/2_json-to-hack`


> [!CAUTION]
> The Key is missing the attribute name. Index settings are retained, but the Key is missed
>
![Incorrect Index Attribute Name](/_images/full/2_missing_index_name.png)


> [!CAUTION]
> The Technical name of the model has somehow reset to “new_model” without any clear reason
>
![Incorrect Model Name](/_images/full/2_incorrect_model_name.png)



### Step 3: Generate JSON again

```
hackolade forweng \
    --outputtype jsonschema \
    --format js \
    --jsonschemacompliance full \
    --skipUndefinedLevel true \
    --structuredpath false \
    --path full/3_hack-to-json-again/ \
    --model full/2_json-to-hack/hackolade_experiment.hck.json \
    --enable-logging
```

### Step 4: Generate Mongo Shell scripts

```
hackolade forweng \
    --outputtype script \
    --format shell \
    --jsonschemacompliance full \
    --skipUndefinedLevel true \
    --structuredpath false \
    --path full/4_hack-to-mongosh \
    --model full/2_json-to-hack/hackolade_experiment.hck.json \
    --enable-logging
```
> [!CAUTION]
> Missing index names (as expected, at this point)
>
![Missing Index Keys](/_images/full/4_missing_index_names.png)

# When using 'extended' for json schema compliance

### Step 1: export to json

```
hackolade forweng \
    --outputtype jsonschema \
    --format js \
    --jsonschemacompliance extended \
    --skipUndefinedLevel true \
    --structuredpath false \
    --path extended/1_hack-to-json/ \
    --model hackolade_experiment.hck.json \
    --enable-logging
```

**Result**: in `extended/1_hack-to-json`

### Step 2: merge back to hackolade:

> [!NOTE]
> Before this step, a copy of the original source hackolade file was placed in the `extended/2_json-to-hack` folder.

```
hackolade revengjson \
    --model extended/2_json-to-hack/hackolade_experiment.hck.json \
    --target MONGODB \
    --targetVersion "v7.x" \
    --files "extended/1_hack-to-json/hackolade_experiment/experimental_database/\*.json" \
    --container experimental_database \
    --conflictresolution merge \
    --maxerdentityboxes true \
    --enable-logging
```

> [!CAUTION]
> The key for each index is _entirely_ missing now. Index settings appear to be retained.
>
![Missing Index Keys](/_images/extended/2_missing_idx_keys.png)

> [!CAUTION]
> The Technical name of the model has somehow reset to “new_model” without any clear reason
>
![Incorrect Model Name](/_images/extended/2_incorrect_model_name.png)


### Step 3: Generate JSON again

```
hackolade forweng \
    --outputtype jsonschema \
    --format js \
    --jsonschemacompliance extended \
    --skipUndefinedLevel true \
    --structuredpath false \
    --path extended/3_hack-to-json-again/ \
    --model extended/2_json-to-hack/hackolade_experiment.hck.json \
    --enable-logging
```

### Step 4: Generate Mongo Shell scripts

```
hackolade forweng \
    --outputtype script \
    --format shell \
    --jsonschemacompliance extended \
    --skipUndefinedLevel true \
    --structuredpath false \
    --path extended/4_hack-to-mongosh \
    --model extended/2_json-to-hack/hackolade_experiment.hck.json \
    --enable-logging
```
> [!CAUTION]
> The resultant script is missing the index key, making this invalid
>
![Invalid Mongo Script](/_images/extended/4_missing_index_in_shell.png)
