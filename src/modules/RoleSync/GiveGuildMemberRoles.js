let RoleIDMap = {
    "Verified Member": "760879807994658856",
    "1st Quad": "760877203004850266",
    "2nd Quad": "760566747089731594",
    "Senior": "577184391080574978",
    "GEXP OP": "765035179219484682"
}

module.exports = {
    RoleIDMap: RoleIDMap,
    GuildMemberRole: class {
        async add(member, role) {
            if (!(role in RoleIDMap)) return;

            let roleResolved = await member.guild.roles.fetch(RoleIDMap[role]);

            await member.roles.add(roleResolved);
        }

        async addRole(member, role) {
            return member.roles.add(role);
        }

        async removeRole(member, role) {
            return member.roles.remove(role);
        }

        async remove(member, role) {
            if (!(role in RoleIDMap)) return;

            let roleResolved = await member.guild.roles.fetch(RoleIDMap[role]);

            if (!member.roles.cache.find(r => r.id === role.id)) {
                return;
            }

            await member.roles.remove(roleResolved);
        }

        async removeAll(member) {
            for (let key in RoleIDMap) {
                if (key === "Verified Member") continue;
                await this.remove(member, key);
            }
        }

    }
}